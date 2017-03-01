# Generates Corporate Code Generators

This project currently creates generators that are customized for corporate implementation.

Required: [Install Node](http://nodejs.org)

## Creating a Corporate Generator

1. [Install Node](http://nodejs.org)
2. Install Yeoman Code Generator engine and register the command globally on your local machine with `npm i yo -g`
3. Create an empty directory to create the generator in.
4. Create your corporate generator: `yo corpcode widgetco "WidgetCo Java Microservices code generator" "WidgetCo" "com.widgetco" "Eric Swanson <ericis@users.noreply.github.com>"`

## Setup a Corporate Generator

1. [Install Node](http://nodejs.org)
2. Install Yeoman Code Generator engine and register the command globally on your local machine with `npm i yo -g`
3. After getting the source code for a Corporate generator on your local machine
4. Install the generator's dependencies with `npm i`
5. Link it as a global NPM command locally with `npm link`
6. Create an empty directory.
7. Run: `yo widgetco:service example`

_Get help by running `yo widgetco:service --help`_
