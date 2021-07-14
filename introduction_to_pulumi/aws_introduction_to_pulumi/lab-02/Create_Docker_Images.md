# Lab 02 - Create & Run a Docker Containers

In this lab, we'll create our first Pulumi resource. We'll run Docker containers that we build locally using infrastructure as code.

## Step 1 - Verify your application

We have a preconfigured MERN (Mongo, Express, React, Node) shopping cart application adapted from this [shopping-cart repository](https://github.com/shubhambattoo/shopping-cart.git). The shopping cart application consists of a frontend client, a backend REST server to manage transactions, and a MongoDB instance for storing product data.

Take a look at `app/` directory. There is a backend, a frontend, and a data directory. Both the frontend and backend directories contain a Dockerfile that builds the application containers.

Let's examine the backend `Dockerfile` in `app/backend/Dockerfile`:

```docker
FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY ./src/package*.json ./
RUN npm install
COPY ./src .
RUN npm build
EXPOSE 3000

CMD [ "npm", "start" ]
```

This `Dockerfile` copies the REST backend into the Docker container, installs the dependencies, and builds the image. Note that port 3000 must be open.

## Step 2 - Create a registry

Before we create images for the application containers, we'll need a place to store them. We'll create a private AWS ECR repository Add the following to `__main__.py`.

```bash
import pulumi_aws as aws

# Create a private ECR repository.
repo = aws.ecr.Repository('my_repo')
```

Because it's a private repository we will need to add a function to authenticate. This function generates a temporary access credential.

```python
# Get registry info (creds and endpoint).
def getRegistryInfo(rid):
    creds = aws.ecr.get_credentials(registry_id=rid)
    decoded = base64.b64decode(creds.authorization_token).decode()
    parts = decoded.split(':')
    if len(parts) != 2:
        raise Exception("Invalid credentials")
    return docker.ImageRegistry(creds.proxy_endpoint, parts[0], parts[1])

image_name = repo.repository_url
registry_info = repo.registry_id.apply(getRegistryInfo)
```

## Step 2 - Build your Docker Image with Pulumi


Before yo can build an image or run a container, make sure you installed the `pulumi_docker` provider from pip inside your virtualenv:

```bash
source venv/bin/activate
pip3 install pulumi_docker
```

You should see output showing the pip package and the provider being installed

Back inside your Pulumi Prograimport pulumi
m, let's build your first Docker image. Inside your program's `__main__.py` add the following:


```python
# [Existing imports]
import pulumi_docker as docker

# Get the stack name
stack = pulumi.get_stack()

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        registry=registry_info
)
```
Run `pulumi up` to build your docker image If you run `aws ecr list-images --repository-name my_repo` you should see your image.

Let's review what's going on in the code. The Docker [Image](https://www.pulumi.com/docs/reference/pkg/docker/image/) resource takes the following for inputs"

- name: a name for the Resource we are creating
- build: the Docker build context, i.e., the path to the app
- image_name: this is the qualified image name which can include a tag
- registry: push to ECR registry

Now that we've provisioned our first piece of infrastructure, let's add the other pieces of our application.

## Adding the frontend client and MongoDB

Our application includes a frontend client and MongoDB. We'll add them to the program.

```python
# build our frontend image!
backend_image_name = "frontend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{backend_image_name}:{stack}",
                        registry=registry_info
)
```

We build the frontend client the same way we built the backend. However, we are going to use the official MongoDB image from Docker Hub, so we use the [RemoteImage](https://www.pulumi.com/docs/reference/pkg/docker/remoteimage/) resource.

```python
# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",
                        name="mongo:bionic")
```

The complete program looks like this:

```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        registry=registry_info
)

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        registry=registry_info
)

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",",
                        name="mongo:bionic"))
```

Run `pulumi up` to build and push images to your AWS registry.

## Next Steps

* [Configuring and Provisioning Containers](../lab-03/Configuring_and_Provisioning_Containers.md)
