package devstack_test

import (
	. "testing-unit-go-stackreferences/devstack"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

var _ = Describe("Dev", func() {
	Context("When I have a StackReference\n", func() {
		mock := &MockStackReference{}
		It("Should have a valid name", func() {
			name := mock.Name()
			expected := pulumi.String(STACK_REF_NAME).ToStringOutput()
			Expect(name).To(Equal(expected))
		})

		It("Should have a valid output", func() {
			output := mock.GetOutput(pulumi.String("foo"))
			expected := pulumi.Any("bar")
			Expect(output).To(Equal(expected))
		})
	})
})
