package devstack

import "github.com/pulumi/pulumi/sdk/v3/go/pulumi"

// RealStackReference is a real implementation of StackReference using pulumi.NewStackReference.
type RealStackReference struct {
	*pulumi.StackReference
}

// Implement the methods of StackReference interface for RealStackReference
func (r *RealStackReference) Name() pulumi.StringOutput {
	return r.StackReference.Name
}

// GetOutput returns a stack output keyed by the given name as an Output
func (r *RealStackReference) GetOutput(name pulumi.StringInput) pulumi.AnyOutput {
	return r.StackReference.GetOutput(name)
}
