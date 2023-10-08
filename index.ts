import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const zoneId = config.require("zoneId");
const domain = config.require("domain")

// An Output to test the settings are set up correctly
export const myFirstOutput = "accountId: " + accountId + ", zoneId:" + zoneId + ", domain: " + domain
