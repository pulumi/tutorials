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

## Step 2 - Build your Docker Image with Pulumi


Before we start, make sure you install the `pulumi_docker` provider from pip inside your virtualenv:

```bash
source venv/bin/activate
pip3 install pulumi_docker
```

You should see output showing the pip package and the provider being installed

Back inside your Pulumi Prograimport pulumi
m, let's build your first Docker image. Inside your program's `__main__.py` add the following:


```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        skip_push=True
)
```
Run `pulumi up` and it should build your docker image If you run `docker images` you should see your image.

Let's review what's going on in the code. The Docker [Image](https://www.pulumi.com/docs/reference/pkg/docker/image/) resource takes the following for inputs"

- name: a name for the Resource we are creating
- build: the Docker build context, i.e., the path to the app
- image_name: this is the qualified image name which can include a tag
- skip_push: flag to push to a registry

Now that we've provisioned our first piece of infrastructure, let's add the other pieces of our application.

## Adding the frontend client and MongoDB

Our application includes a frontend client and MongoDB. We'll add them to the program.

```python
# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=True
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
                                 name="mongo:bionic"
                                 )
```

## Next Steps

* [Configuring and Provisioning Containers](../lab-03/Configuring_and_Provisioning_Containers.md)
