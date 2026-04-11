# Presipes
Preston's Recipes: a Recipe app by Preston Fitzgerald for the final project for IS 542

## Preject description and explaination for grading
Presipes  aims to be a place to search new recipes and store you own recipes. Searches
are made using themealdb.com, and personal recipes are stored in the browser's local
storage. 

The app was created using Vite/React in TypeScript. Routing was handled using react-router-dom.
The set up for the routing can be found in [App.tsx](src/components/App.tsx).For the best examples of 
state usage, I recommend viewing [RecipeForm.tsx](src/components/RecipeForm.tsx). For the most comprehensive
example of API usage, I recommend [Search.tsx](src/components/Search.tsx), where you will find a use effect
that calls the API and narrows the type effectively. For the most comprehensive use of local storage,
I recommend [RecipeForm.tsx](src/components/RecipeForm.tsx), where you will find both reading and writing to
local storage.

## Viewing the site
Hosted on GitHub Pages:

https://prestonfitz.github.io/semester_project

To run locally, simply run `npm run dev` from the root folder.

## API Usage

Recipes are searched using themealdb.com. When the home page is rendered, it makes a random
search for a set of recipes to show the user. The user can then either select a recipe to
view or make a search. The search queries by recipe title. When a recipe is selected, the
recipe is queried again, but this time by ID. I chose to do it this way rather than pass the
recipe object itself so that URLs would consistently lead to the same place as long as you
know the ID for the recipe.
