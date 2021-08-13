# Pikapaka project

> - This project was built on combining Nextjs & Nestjs framework, using lerna for workspaces monorepo setup.
> - For getting more document, pls refer this link
> - [Frontend](./packages/client/Readme.md)
> - [Backend](https://docs.nestjs.com)

## Technical stacks

1. lerna v4.0.0
2. Nest framework v8.0.0
3. Next framework v11.0.1
4. React JS v17.0.2
5. Redux v7.2.4
6. React hook form v7.10.0
7. Tailwindcss v2.2.4

## Development setup

_Install dependencies library:_ `yarn`

### For frontend development

1. Init config app

   `cp -R packages/client/configs.example packages/client/configs`

2. Run project as development environment

   `npm run dev:client`

   ==> Url: http://localhost:3000

### For backend development

1. Init config app

   `cp -R packages/server/configs.example packages/server/configs`

2. Run project as development environment

   `npm run dev:server`

   ==> Url: http://localhost:3001

## Install dependencies notice!

- For client:

  `./node_modules/.bin/lerna add packageName --scope=client`

- For server:

  `./node_modules/.bin/lerna add packageName --scope=server`
