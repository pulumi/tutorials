## Lab-03 Configuring and Provisioning Containers

Now that we've created our images, we can provision our application with a network and containers.

## Step 1 - Configure the application

Add the following configuration variables to your Pulumi program below the imports:

```python
config = pulumi.Config()
frontend_port = config.require_int("frontend_port")
backend_port = config.require_int("backend_port")
mongo_port = config.require_int("mongo_port")
```
Your Pulumi program should now look like this:

```python
import pulumi
import pulumi_docker as docker

# get configuration 
config = pulumi.Config()
frontend_port = config.require_int("frontend_port")
backend_port = config.require_int("backend_port")
mongo_port = config.require_int("mongo_port")

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        skip_push=True
)

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontkend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=True
)

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",
                        name="mongo:4.4.6",
                        keep_locally=True)
```

Try and run your `pulumi up` again at this point. You should see an error like this:

```
Diagnostics:
  pulumi:pulumi:Stack (my-first-app-dev):
    error: Missing required configuration variable 'my-first-app:frontend_port'
        please set a value using the command `pulumi config set my-first-app:frontend_port <value>`
    error: an unhandled error occurred: Program exited with non-zero exit code: 1
```

This is because we have specified that this config option is _required_. Let's set the ports for this stack:

```bash
pulumi config set frontend_port 3001
pulumi config set backend_port 3000
pulumi config set mongo_port 27017
```

Now, try and rerun your Pulumi program.

Your Pulumi program should now run, but you're not actually using this newly configured ports, yet!

## Step 2 - Create a Container resource

In lab 02 we built Docker images. Now we want to create Docker containers and pass our configuration to them. Our containers will need to connect to each other so we will need to create a network.

```python
# create a network!
network = docker.Network("network",
                        name="services")
```

Define a new resource in your Pulumi program below the `image` resource, like this:

```python
# create the backend container!
backend_container = docker.Container("backend_container",
                        image=backend.base_image_name,
                        ports=[docker.ContainerPortArgs(
                            internal=backend_port, 
                            external=backend_port)],
                        envs=[
                            f"DATABASE_HOST={mongo_host}",
                            f"DATABASE_NAME={database}",
                            f"NODE_ENV={node_environment}"
                        ],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name
                        )],
                        opts=pulumi.ResourceOptions(depends_on=[mongo_container])
)
```

It is important to note something here. In the Container resource, we are referencing `baseImageName` from the `image` resource. Pulumi now knows there is a dependency between these two resources, and will know to create the `container` resource _after_ the image resource. Another dependency to note is that the `backend_container` depends on the `mongo_container`. If we tried to run `pulumi up` without the `mongo_container` running, we would get an error message.

The backend container also requires environment variables to connect to the mongo container and set the node environment for Express.js. These are set in `./app/backend/src/.env`. Like before we can set them using `pulumi config`.

```bash
pulumi config set mongo_host http://mongo:27017
pulumi config set database cart
pulumi config set node_environment development
```

## Step 3 - Putting it all together

Now that we know how to create a container we can complete our program.

```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()
config = pulumi.Config()

frontend_port = config.require_int("frontend_port")
backend_port = config.require_int("backend_port")
mongo_port = config.require_int("mongo_port")
mongo_host = config.require_string("mongo_host")
database = config.require_string("database")
node_environment = config.require_string("environment")

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        skip_push=True
)

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=True
)

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",
                        name="mongo:bionic")

# create a network!
network = docker.Network("network",
                        name="services")

# create the backend container!
backend_container = docker.Container("backend_container",
                        image=backend.base_image_name,
                        ports=[docker.ContainerPortArgs(
                            internal=backend_port, 
                            external=backend_port)],
                        envs=[
                            f"DATABASE_HOST={mongo_host}",
                            f"DATABASE_NAME={database}",
                            f"NODE_ENV={node_environment}"
                        ],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name
                        )],
                        opts=pulumi.ResourceOptions(depends_on=[mongo_container])
)

# create the frontend container!
frontend_container = docker.Container("frontend_container",
                        image=frontend.base_image_name,
                        ports=[docker.ContainerPortArgs(
                            internal=frontend_port, 
                            external=frontend_port)],
                        envs=[
                            f"LISTEN_PORT={frontend_port}",
                        ],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name
                        )]
)

# create the mongo container
mongo_container = docker.Container("mongo_container",
                        image=mongo_image.latest,
                        ports=[docker.ContainerPortArgs(
                          internal=mongo_port, 
                          external=mongo_port
                        )],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name,
                            aliases=["mongo"]
                        )]
)
```

Run `pulumi up` and our application is running. However, the store is empty and we need to add products to the database.

## Step 4 - Populate the database

We'll use Docker to populate mongodb. First, we will copy the data to the mongodb container, then open a shell in the container and import the data.

```bash
docker cp data/products.json mongo:/tmp/products.json
docker exec -it mongo sh
```

This opens a shell in the mongo container and we can use `mongoimport` to load the data into the database.

```sh
mongoimport -d cart -c products --file /tmp/products.json --jsonArray
```

Open a browser to `http://localhost:3001` and our application is now deployed.

# Next Steps

* [Exporting Outputs](../lab-04/Exporting_Outputs.md)