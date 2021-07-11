# Lab 04 - Outputs & Stack References

We've created some resources, now let's see how we can use outputs outside of Pulumi

## Step 1 - Export the values from `my-first-app`

In stack 1, modify your program to add an exported value:


```python
pulumi.export("container_id", mongo_container.id)
```

Your Pulumi program should now look like this:

```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()
.
.
.
# create the mongo container
mongo_container = docker.Container("mongo_container",
                        image=mongo_image,
                        ports=[docker.ContainerPortArgs(
                          internal=mongo_port, 
                          external=mongo_port
                        )],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name,
                            aliases=["mongo"]
                        )]
)

pulumi.export("container_id", mongo_container.id)

```

Run `pulumi up` to make sure the stack gets updated, and the value is exported.

## Step 2 - Look at your running Docker container.

You can now use this output value using the `pulumi stack output` command:

```bash
pulumi stack output container_id
44dde1c3ec15ed9bc372f7d513265cd4847f56223395983caed3188c2db214c8
```

Which also means you can use them in scripts, like so:

```bash
docker stats --no-stream $(pulumi stack output container_id)
CONTAINER ID        NAME                   CPU %               MEM USAGE / LIMIT   MEM %               NET I/O             BLOCK I/O           PIDS
44dde1c3ec15        my-first-app-0d221af   0.00%               0B / 0B             0.00%               1.02kB / 796B       0B / 0B             0
```

## Step 3 - Create a "prod" stack

We're now going to use the `pulumi stack` command to understand how stacks work. Let's list our existing stacks using: `pulumi stack ls`

We currently only have one stack. Let's add a new one!

```bash
pulumi stack init prod
```

Now we have created a pulumi `prod` stack, let's try rerun our `pulumi up`:

```
Diagnostics:
  pulumi:pulumi:Stack (my-first-app-prod):
    error: Missing required configuration variable 'my-first-app:frontend_port'
        please set a value using the command `pulumi config set my-first-app:frontend_port <value>`
```

Our configuration error is back! This is because when we configure values in pulumi, they are specific to a stack. So, let's set a port for our prod stack:

```bash
pulumi config set frontend_port 3001
pulumi config set backend_port 3000
pulumi config set mongo_port 27017
pulumi config set mongo_host mongodb://mongo:27017
pulumi config set database cart
pulumi config set node_environment production
```

Make sure you use a different port to your `dev` stack!

Now, run `pulumi up` again. You should get a whole new image and container, this time running on port 5000!

## Step 4 - Create a second stack

In a new directory, create a second stack called `use-docker-id`

```bash
mkdir use-docker-id
cd use-docker-id
pulumi new python
```

Use the defaults, and ensure you use the `dev` stack.

## Step 5 - Configure your stack reference

Now we need to add a stack reference in use-docker-id


```python
import pulumi

config = pulumi.Config()
stack = pulumi.get_stack()
org = config.require("org")

stack_ref = pulumi.StackReference(f"{org}/my-first-app/{stack}")

pulumi.export("containerId", stack_ref.get_output("container_id"))
```

Run `pulumi up`. You'll see the value gets exported from this stack now too.

These exported values are incredibly useful when using Pulumi stacks

Congratulations, you've now finished the introduction to Pulumi tutorial!
