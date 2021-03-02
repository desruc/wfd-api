<h1 align="center">wfd-api</h1>
<p align="center">The backend for WFD! A Node/Express app written in TypeScript.</p>

<h3 align="center">
  <a href="https://github.com/desruc/wfd-next-js/tree/master/client">View client</a>
</h3>

## First things first! 🚨

This is a work in progress! As you can see there is only a `develop` branch... I will remove this disclaimer and create a `master` branch when the first iteration is ready.

## What is wfd? 🍳

wfd is a recipe sharing platform!

## Features ⚡️

- 💙 **TypeScript**
- ✔️ **Tests** - Jest is all set up and ready to go!
- 😻 **Linting** - Eslint configured with TypeScript packages
- 💻 **VS Code ready** - Predefined config. Auto format on save etc.
- 🐶 **Husky** - Ensures lint and format before commits

## Setting up development 🛠️

- Clone this repo
- run `yarn install` in the root directory
- create an `.env` file from the supplied `.env.example` and fill in the details
- run `docker-compose up -d` to start a local mongo container
- run `yarn start` to start the API

## Hot tips 🔥

- `./src` has been mapped to `~` for cleaner imports
- A Winston logger has been set up - be sure to import it from `~/core/logger`
  - Logs are stored under the `logs` folder in the root directory, have a limit of 5mb and are not to be commited to the repo.
