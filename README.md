# Redux-Kit-N

Simplifying the creation of a [React](https://facebook.github.io/react/) application with [Redux](http://redux.js.org/) 
With our easy to use interface you can build out the scaffold of your application. Without getting bogged down in the 'boiler-plate'
code that is a nessessary part of Redux. Once you have the components, store and actions you want, 
click on the export button and you will receive a project directory in a zip file ready to add deeper functionality and integrate with a variety of stacks. 

## Team

- Neal Williams
- Cody Unger
- Daniel Darrach

<!-- ## Roadmap

View the project roadmap [here](LINK_TO_DOC) -->

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

> The Interface is divided into 4 main sections
1. [Components](#Components)
2. [App Tree](#App Tree)
3. [Store Schema](#Store Schema)
4. [Actions](#Actions)

You can toggle any of these views in the top right by clicking the section name.

### Components
In this section you can create and name new components. click the '+' to add one then click and drag it to whichever other component should render that new component
hovering over the compoennt will also expose a few tools for that specific component including:
    - Edit the name
    - Expand or hide it's direct decendents 

### App Tree
This section will visualize the decendancy of your components.
From here you can also connect the components to the store, specify what actions should be available, and link props from a parent or the store. 

### Store Schema
From here you will specify what you want to keep in the store,  naming and specifying the types of information.
The Add Property wizard will help to make sure you can specify exactly what type of data you're expecting to keep, making specifying actions a breeze! 

### Actions
This section will show all the actions you have specified for the app so far. 
click the '+' to open the Add Action wizard that will help you create all the actions you need,  linking in all the store properties you've specified. 
Change your mind later?  no problem!  hover over the action you need to change and you will be able to edit it!

## Requirements

- Node 6.9.x
- Redis 3.2.x


## Development

### Installing System Dependencies

```
brew install yarn

```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
```

## App Configuration

Override settings `config/default.json` in any environment by making a copy of `config/ENV.example.json` and naming it `config/ENV.json` and setting the appropriate variable. 

For environments that require use of environment variables, you can supply variables as defined in `config/custom-environment-variables.json`.

See https://www.npmjs.com/package/config
And https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables
<!-- 
## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

To migrate to the latest version, run:

`knex migrate:latest --env NODE_ENV`

To rollback a version, run:

`knex migrate:rollback --env NODE_ENV`

To populate the database with seed data, run:

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment. -->

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`


