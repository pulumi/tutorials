import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain")

// Create a Cloudflare resource (Zone)
const zone = new cloudflare.Zone("my-zone", {
    zone: domain,
    accountId: accountId,
    plan: "free", // Choose the desired plan, e.g., "free", "pro", "business", etc.
    jumpStart: true,
});

// Export the zone ID 
export const zoneId = zone.id;

// Export the Cloudflare-assigned nameservers.
export const nameservers = zone.nameServers;

// Export the status
export const status = zone.status;

// Set up a Record for your site
const record = new cloudflare.Record("my-record", {
    zoneId: zoneId,
    name: domain,
    value: "192.0.2.1",
    type: "A",
    proxied: true,
});
