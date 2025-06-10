Prompts: 

Please create a basic VITE typescript application in my project folder.
npm create vite@latest . --template typescript

With help of openapi-generator-cli I want to generate typescript client classes for my petstore.yml swagger file in the folder src/generated

npx @openapitools/openapi-generator-cli generate -i resources/petstore.yml -g typescript-fetch -o src/generated


Implement a list page, pets.tsx, which shows a list of the class Pet.ts from generated models.

The next step is to implement a page category.tsx, to show a list of the class Category from generated models.


Please switch the backend service to my server which is used for accessing the PetApi.
Please create a configuration object before instanting the PetApi and use this configuration.
My Basepath is "http://127.0.0.1:8000"


The next step is to refactor my pets.tsx. Please refactor the configuration to another file. I need it for using the CategoryApi too.