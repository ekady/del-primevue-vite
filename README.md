
# Vue 3 Boilerplate with TypeScript, PrimeVue, and Tailwind CSS

This is a boilerplate codebase for starting a Vue 3 project with TypeScript, PrimeVue, and Tailwind CSS. It includes a recommended folder structure and naming conventions for your project.

## Prerequisites

Make sure you have Node.js version 16 or higher installed.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) +  [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Installation

1. Clone this repository.
`git clone https://github.com/ekady/del-primevue-vite.git`

2. Navigate to the project directory.
    `cd del-primevue-vite`

3. Install the project dependencies using Yarn.
    `yarn install`

## Development Mode

To run the project in development mode, use the following command:
`yarn dev`

## Build

To build the project, use the following command:
`yarn build`

## Preview Build

To preview the build, use the following command:
`yarn preview`

## Folder Structure

    src/
    ├── core/
    │   ├── assets/
    │   │   └── styles/
    │   ├── ... (other global resources)
    │
    ├── modules/
    │   ├── auth/
    │   │   ├── store/
    │   │   │   └── auth.store.ts
    │   │   ├── router/
    │   │   │   └── auth.route.ts
    │   │   ├── locale/
    │   │   │   ├── auth.en.locale.json
    │   │   │   └── auth.id.locale.json
    │   │   ├── views/
    │   │   │   └── AuthLoginUI.vue
    │   │   ├── ... (other auth module resources)
    │   │
    │   ├── ...(other modules)
    │
    ├── plugins/
    │   ├── axios/
    │   │   └── index.ts
    │   ├── ...(other plugins)
    │
    └── ... (other source code)

## Naming Conventions

- Store files should follow the convention: `<name>.store.ts`.
- Router files should follow the convention: `<name>.router.ts`.
- Locale files should follow the convention: `<name>.<lang>.locale.json`.

## License

This project is licensed under the MIT License.
