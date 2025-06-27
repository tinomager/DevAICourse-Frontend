# DevAICourse Frontend

This repository contains an educational frontend project that interacts with the [Swagger Petstore](https://swagger.io/docs/specification/about/) API. The project demonstrates how to incrementally build a modern frontend application using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/), leveraging OpenAPI-generated client code for seamless API integration.

## Purpose

The main goal of this repository is to provide a step-by-step learning resource for developers who want to understand how to design, implement, and evolve a frontend application that consumes a RESTful API. Each stage in the repository represents a milestone in the development process, showing how to approach and solve common frontend challenges.

## Task

For each stage of the project, your goal is to incrementally implement the required features and improvements as described in the stage documentation. Use an AI coding assistant (such as GitHub Copilot or a dedicated model) to help you and try to avoid as far as possible to implement the required changes completely by hand.

For each stage you should:

1. Understand the Requirements: Carefully read the description and goals for the current stage.
2. Plan the Changes: Identify which files and code sections need to be added or modified. You can also use a code agent and let it decide where to make changes—but carefully review what the agent does.
3. Interact with the AI Assistant: Ask the assistant for code snippets, explanations, or best practices relevant to the stage. Request code reviews or suggestions for improvements. Use the assistant to generate boilerplate code, unit tests, or documentation as needed. Hint: In Roo Code you can change the mode how the agent works between different modi. Check them out. Or use Continue for chatting with the AI.
4. Implement and Test: Apply the suggested changes to your codebase. Test the new functionality to ensure it meets the requirements. Hint: Some code agents like Roo Code also test whether implemented changes work.
5. Compare your changes with the suggested state in the State branches. Due to usage of the AI, your code does not necessarily look like the solution given in the stage.

## Stages

The repository is divided into different stages, each represented by a branch or folder (depending on your setup):

0. **Stage 0: Main Branch**
   - The initial repo setup with Vite, React, and TypeScript, and the Petstore OpenAPI specification included.

1. **Stage 1: API Client Generation**
   - Contains a "src/generated" folder with TypeScript API client code generated from the Petstore OpenAPI specification.
   - The generated models and API clients match the API specification YAML file.
   - Hint: Try to generate the client code directly with help of the AI or CLI tools like OpenAPI Generator.

2. **Stage 2: Basic UI and API Integration**
   - Implement basic UI components for listing and viewing pets, categories, and tags.
   - Integrate the generated API client to fetch and display data from the backend.
   - Use React functional components and hooks for state management.

3. **Stage 3: CRUD Operations and Forms**
   - Add forms and UI for creating, editing, and deleting pets.
   - Implement state updates and API calls for CRUD operations.
   - Improve user experience with loading states and error handling.
