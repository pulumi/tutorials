## Creating a Project

Infrastructure in Pulumi is organized into Projects. Each Project is a single program that, when run, declares the desired infrastructure for Pulumi to manage.

## Step 1 &mdash; Create a Directory

Each Pulumi Project lives in its own directory. Create one now and change into it:

```bash
mkdir my-first-app
cd my-first-app
```

> Pulumi will use the directory name as your project name by default. To create an independent project, simply name the directory differently.

## Step 2 &mdash; Initialize Your Project

A Pulumi Project is just a directory with some files in it. It's possible for you to create a new one by hand. The `pulumi new` command, however, automates the process:

```bash
$ pulumi new python -y
```

This prints output similar to the following with a bit more information and status as it goes:

```
Created stack 'dev'

Creating virtual environment...

Finished creating virtual environment

Updating pip, setuptools, and wheel in virtual environment...
...
Your new project is ready to go! ✨

To perform an initial deployment, run 'pulumi up'
```

This command creates all the files we need, initializes a new stack named `dev` (an instance of our project), and installs the needed package dependencies from PyPi.

## Step 3 &mdash; Inspect Your New Project

Our project is comprised of multiple files:

* **`__main__.py`**: your program's main entrypoint file
* **`requirements.txt`**: your project's Python dependency information
* **`Pulumi.yaml`**: your project's metadata, containing its name and language
* **`venv`**: a [virtualenv](https://pypi.org/project/virtualenv/) for your project

Run `cat __main__.py` to see the contents of your project's empty program:

```python
"""A Python Pulumi program"""

import pulumi
```

Feel free to explore the other files, although we won't be editing any of them by hand. Note that the Pulumi CLI creates a virtual environment, `venv`, for the project.

# Next Steps

* [Create Docker Images](../lab-02/Create_Docker_Images.md)
