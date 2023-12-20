package dev

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

const STACK_REF_NAME = "myOrg/myProject/myStack"

// StackReference is an interface that wraps the methods of pulumi.StackReference.
type StackReference interface {
	Name() pulumi.StringOutput
	GetOutput(name pulumi.StringInput) pulumi.AnyOutput
}

func Go() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// TODO
		return nil
	})
}
