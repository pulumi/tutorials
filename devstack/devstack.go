package devstack

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

const STACK_REF_NAME = "myOrg/myProject/myStack"

// StackReference is an interface that wraps the methods of pulumi.StackReference.
type StackReference interface {
	Name() pulumi.StringOutput
	// Include other methods needed for your code
	GetOutput(name pulumi.StringInput) pulumi.AnyOutput
}

func NewStackReference(ctx *pulumi.Context, name string) (StackReference, error) {
	stackRef, err := pulumi.NewStackReference(ctx, name, nil)
	if err != nil {
		return nil, err
	}
	return &RealStackReference{StackReference: stackRef}, nil
}

func Go() {
	pulumi.Run(func(ctx *pulumi.Context) error {

		// Create a new stack resource
		// The referenced stack must already have been deployed to resolve the reference
		stackRef, err := NewStackReference(ctx, STACK_REF_NAME)
		if err != nil {
			return err
		}

		// Use an output property from the stack reference
		stackRefOutput := stackRef.GetOutput(pulumi.String("someOutput"))

		// Export the stack reference output
		ctx.Export("stackRefOutput", stackRefOutput)

		return nil
	})
}
