# SMG Automotive Components Library

This is a reusable component library for SMG Automotive projects, built with React, TypeScript, and Chakra UI.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/smg-automotive/components-pkg.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd components-pkg
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run the following commands:

-   `npm run build`
    Builds the component library for production to the `dist` folder.

-   `npm run lint`
    Lints the codebase for errors and style issues.

-   `npm run format`
    Formats the code and fixes linting issues.

-   `npm run typecheck`
    Runs the TypeScript compiler to check for type errors.

-   `npm test`
    Runs the test suite using Jest.

## Running the Demo App

This project includes a demo application to showcase the components in the library.

1.  Install the demo app's dependencies:
    ```bash
    npm run demos:install
    ```

2.  Run the demo app:
    ```bash
    npm run demos
    ```

This will start the Vite development server and open the demo app in your browser, typically at `http://localhost:3000`.

## Project Structure

-   `src/`: Contains the source code for the component library.
    -   `components/`: Individual React components.
    -   `hooks/`: Shared React hooks.
    -   `themes/`: Chakra UI theme configurations.
    -   `lib/`: Core library logic, including the Supabase client.
-   `demos/react-app`: The demo application for showcasing components.
-   `dist/`: The compiled output of the component library.
-   `scripts/`: Miscellaneous scripts for tasks like testing connections.
