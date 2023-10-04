import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const zoneId = config.require("zoneId");
const domain = config.require("domain")

// An Output to test the settings are set up correctly
export const myFirstOutput = "accountId: " + accountId + ", zoneId:" + zoneId + ", domain: " + domain

// A Worker scrpit to invoke
export const script = new cloudflare.WorkerScript("hello-world-script", {
    accountId: accountId,
    name: "hello-world",
    content: `
        addEventListener("fetch", event => {
          event.respondWith(handleRequest(event.request))
        });

        async function handleRequest(request) {
          return new Response('Hello from my Worker!', { status: 200 });
        }
        `
});

// A Worker route to serve requests and the Worker script
export const route = new cloudflare.WorkerRoute("hello-world-route", {
    zoneId: zoneId,
    pattern: "hello-world." + domain,
    scriptName: script.name,

});

// A DNS record to access the route from the domain
export const record = new cloudflare.Record("hello-world-record", {
    zoneId: zoneId,
    name: script.name,
    value: "192.0.2.1",
    type: "A",
    proxied: true
});
