---
content_type: tutorial
updated: 2023-10-04
title: Deploy a Hello World application via Pulumi
---

# Deploy a Hello World application via Pulumi

In this tutorial, you will go through step-by-step instructions to deploy a Hello World web application using Cloudflare Workers and Pulumi so that you can become familiar with the resource management lifecycle. In particular, you will create a worker, add a route, and add a DNS record to access the application before cleaning up all the resources.

{{<Aside type="note" header="Header text">}}

This tutorial will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.
Pre-requisites

{{</Aside>}}

{{<tutorial>}}

{{<tutorial-prereqs>}}

- npm
- Pulumi CLI
- A Pulumi Cloud free account
- A Cloudflare API Token with permissions to edit the resources in this tutorial.


{{</tutorial-prereqs>}}

{{<tutorial-step title="Step 1 - Initialize Pulumi">}}

Create a new Pulumi project via the CLI

```bash
$ pulumi login

Manage your Pulumi stacks by logging in.
Run `pulumi --help` for alternative login options.
Enter your access token from https://app.pulumi.com/account/tokens
    or hit <ENTER> to log in using your browser                   :
$ pulumi new  https://github.com/desteves/serverless-cloudflare/tree/typescript-begin` --stack dev
$ npm install @pulumi/cloudflare
$ pulumi config set zoneId <zoneId>
$ pulumi config set accountId <accountId>
$ pulumi config set cloudflare:apiToken --secret  <press Enter>
> value: <paste your Cloudflare API Token>

$ pulumi up


```

{{</tutorial-step>}}

{{<tutorial-step title="Step 2 - Deploy "Hello World" script>}}

Step 2 content

{{</tutorial-step>}}

{{<tutorial-step title="Step 3 - Add a route">}}

Step 3 content

{{</tutorial-step>}}
{{<tutorial-step title="Step 3 - Add a DNS record ">}}

Step 3 content

{{</tutorial-step>}}

{{<tutorial-step title="Step 4 - Destroy eveyrthing">}}

Step 4 content

{{</tutorial-step>}}

{{</tutorial>}}






Install the pulumi CLI


"Edit Cloudflare Workers" API Token


https://developers.cloudflare.com/workers/examples/geolocation-hello-world/

Initialize Pulumi

$ npm install @pulumi/cloudflare
$ pulumi new --non-interactive  –name hello-world –description "A Cloudflare Workers hello world Pulumi program" --dir  infra –stack dev

$ pulumi config set zoneId <zone-id>
$ pulumi config set accountId <accountId>
$ pulumi config set cloudflare:apiToken --secret  <press Enter>
> value: <paste your Cloudflare API Token>

Deploy "Hello World" script
$ pulumi up


     Type                              Name                                  Plan
 +   pulumi:pulumi:Stack               serverless-cloudflare-typescript-dev  create
 +   ├─ cloudflare:index:WorkerScript  myWorkerScript                        create
 +   └─ cloudflare:index:WorkerRoute   api                                   create


Outputs:
    url: {
        @isPulumiResource: true
        id               : output<string>
        pattern          : "/"
        scriptName       : "hello-world-script"
        urn              : "urn:pulumi:dev::serverless-cloudflare-typescript::cloudflare:index/workerRoute:WorkerRoute::api"
        zoneId           : "212926c23280c32a453a953b84964d33"
    }

Resources:
    + 3 to create

Do you want to perform this update?  [Use arrows to move, type to filter]
  yes
> no
  details


Add a DNS record

Destroy everything

