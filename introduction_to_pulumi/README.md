# Introduction to Pulumi

This tutorial demonstrates how to use Pulumi to build, configure, and deploy a modern application using Docker. The application is a MERN (MongoDB, Express, React, Node) application and we will create a frontend, a backend, and mongodb container to deploy the Pulumipus Boba Tea Shop

## Prequisites

You will need the following to complete this tutorial.

1. A [Pulumi account and token](http:app.pulumi.com)
2. [Docker](https://docs.docker.com/get-docker/)
3. Python 3.8 or later

## Tutorial

The tutorial is divided into sections that guide you through the process of creating infrastructure with Pulumi, configuring it, and using Pulumi to push your infrastructure to production. The Docker tutorial let's you learn Pulumi on your computer without a cloud provider account. Cloud specific tutorials follow a similar process but are tailored to each individual cloud provider.

### Docker

Docker is used in this tutorial to let you learn the basics of Pulumi without an cloud account. You will learn the following:

- [Create a Pulumi Project](./lab-01/Creating_a_Pulumi_Project.md),
- [Build Docker Images](./lab-02/Create_Docker_Images.md),
- [Configurig and Provisioning Containers](./lab-03/-Configuring_and_Provisioning_Containers.md),
- [Exporting Outputs](./lab-04/Exporting_Outputs.md)

### AWS

The AWS tutorial covers Pulumi basics with AWS.

- [Create a Pulumi Project](./lab-01/Creating_a_Pulumi_Project.md),
- [Build Docker Images and Registry](./lab-02/Create_Docker_Images.md),
- [Creating AWS IAM Policies](./lab-03/Create_IAM_Policies.md),
- [Configurig and Provisioning Containers](./lab-04/-Configuring_and_Provisioning_Containers.md),
- [Creating a Fargate Service](./lab-05/Creating_a_Fargate_Service.md),
- [Exporting Outputs](./lab-06/Exporting_Outputs.md)

### Azure

TBD

### Google Cloud

TBD
