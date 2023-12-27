package devstack

import "github.com/pulumi/pulumi/sdk/v3/go/pulumi"

// MockStackReference is a mock implementation of StackReference for testing purposes.
type MockStackReference struct {
	// Include fields and methods needed for testing
}

// Implement the methods of StackReference interface for MockStackReference

// For example:
func (m *MockStackReference) Name() pulumi.StringOutput {
	// Mock implementation
	return pulumi.String(STACK_REF_NAME).ToStringOutput()
}

func (m *MockStackReference) GetOutput(name pulumi.StringInput) pulumi.AnyOutput {
	// Mock implementation
	if name == pulumi.String("foo") {
		return pulumi.Any("bar")
	} else {
		return pulumi.Any(nil)
	}
}
