import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain")

// step 1
export const myTestOutput = "Hurray!";