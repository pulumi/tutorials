#!/bin/sh

pip3 install -r requirements.txt

projectId=$(( RANDOM % 90000000 + 10000000 ))

aws cloudformation deploy \
--template-file aws/infra.yaml \
--stack-name pulumi-esc-tutorial-stack-$projectId \
--capabilities CAPABILITY_IAM \
--parameter-overrides deploymentId=$projectId\

echo "Please see the below for your application output values: "

aws cloudformation describe-stacks --stack-name pulumi-esc-tutorial-stack \
--query "Stacks[*].Outputs[*].{OutputKey: OutputKey, OutputValue: OutputValue, Description: Description}"
