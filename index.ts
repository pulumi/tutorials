import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const zoneId = config.require("zoneId");


// Test these are set up
export const testAccountId = accountId;
export const testZoneId = zoneId;