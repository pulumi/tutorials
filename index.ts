import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import * as fs from "fs";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const zoneId = config.require("zoneId");
const domain = config.require("domain")

// A Worker script to invoke
export const script = new cloudflare.WorkerScript("hello-world-script", {
  accountId: accountId,
  name: "hello-world",
  // Read the content of the worker from a file
  content: fs.readFileSync("./app/worker.ts", "utf8"),
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

// An Output to test the settings are set up correctly
export const url = route.pattern
