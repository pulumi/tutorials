# Introduction to Pulumi

This tutorial demonstrates how to use Pulumi to build, configure, and deploy a modern application using Docker. The application is a MERN (MongoDB, Express, React, Node) application and we will create a frontend, a backend, and mongodb container to deploy the Pulumipus Boba Tea Shop

## Prequisites

You will need the following to complete this tutorial.

1. A [Pulumi account and token](http:app.pulumi.com)
2. [Docker](https://docs.docker.com/get-docker/)
3. Python 3.8 or later

## Tutorial

The tutorial is divided into four sections that guide you through the process of creating infrastructure with Pulumi, configuring it, and using Pulumi to push your infrastructure to production.

Docker is used in this tutorial to let you learn the basics of Pulumi without an cloud account. You will learn the following:

- [Create a Pulumi Project](./lab-01/Creating_a_Pulumi_Project.md),
- [Build Docker Images](./lab-02/Create_Docker_Images.md),
- [Configurig and Provisioning Containers](./lab-03/-Configuring_and_Provisioning_Containers.md),
- [Exporting Outputs](./lab-04/Exporting_Outputs.md)
