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

Please use the CategoryApi to load the categories from my backend server instead of using dummy values.

Now I want to add an edit button for every category listed in category.tsx. When the user clicks on the edit button, a form should open as pupop to edit the category name. After submitting the form, the name should be updated with the method CategoryApi.updateCategory

Next step is to implement an "Add" Button to create new categories. After clicking the "Add" button, a popup should open where a new Category with Id and name can be entered. After submitting the form, the new category should be stored with the method CategoryApi.addCategory

Now it is getting a bit more complicated. I now need funktionality to edit a pet. I want to have an edit button for every pet listed in pets.tsx. When the user is clicking on the edit button, a form should open as popup to the the pet. After submitting the form, the pet should be updated with the method PetApi.updatePet.

-> Ok. The update form misses the photoUrls array and the category. Lets start with the photo urls. We want list all photourls a pet has. Allow to edit the text. Allow to remove an entry and allow to add new entries.