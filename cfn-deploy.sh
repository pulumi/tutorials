#!/bin/sh

pip3 install -r requirements.txt

aws cloudformation deploy \
--template-file aws/infra.yaml \
--stack-name pulumi-esc-tutorial-stack \
--capabilities CAPABILITY_NAMED_IAM \
--region us-west-2 \
--tags owner=docs-team

echo "Please see the below for your application output values: "

aws cloudformation describe-stacks --stack-name pulumi-esc-tutorial-stack \
--query "Stacks[*].Outputs[*].{OutputKey: OutputKey, OutputValue: OutputValue, Description: Description}"
