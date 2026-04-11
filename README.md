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

## AI Usage
AI was used minimally. My AI of choice was Codex. Prompts and responses were as follows:
```
Me: The current UI issues are mostly structural: sparse layout, inline styles, and ungrouped controls. I’m checking what styles.css already provides so I can restyle by reusing
  existing classes instead of inventing a competing layer in App.css.
  
Codex: The restyle stays on top of the existing styles.css utility layer and fixes the structural issues without touching component code: the app now has a centered content shell, card-
  like grouping for sections, consistent button/link/input treatment, stronger recipe list cards, better form spacing for ingredient/instruction controls, and mobile-safe layout
  rules. I also added a few targeted overrides to neutralize the current inline spacing/color styles where they were blocking a cohesive layout.

  Verification: npm run build passed. There was already an unrelated README.md modification in the worktree.
  
Me: That is good, but perhaps a bit much for me. Can we do a bit simpler of a styling and focus on using primarily the styles found in src\styling\styles.css?

Codex: Yes. I simplified [App.css](C:\Users\prest\Documents\College\MISM Semester 4\IS 542\semester_project\src\styling\App.css) so it leans much more on the Bootstrap-style tokens and
  defaults already present in src/styling/styles.css.

  The app layer now just handles a few essentials: page container spacing, a basic white content card, simple pill links/buttons, cleaner inputs, modest recipe list borders, and
  responsive stacking for the ingredient controls. The heavier custom shadows, gradients, and more opinionated card treatments are gone.
  
Me: You will need to reindex it because I made some changes, but please take a look at src\components\RecipeForm.tsx. The buttons for the ingredient inputs need work. If we could
    have the input boxes on the same line with the buttons below, similar to the instructions input, that would be appreciated. In addition, let's change the input boxes for the
  instructions to be text areas instead. Feel free to change the .tsx to make that change. Changes to the .tsx should be as minimal as possible.
  
Codex: Adjusted [RecipeForm.tsx](C:\Users\prest\Documents\College\MISM Semester 4\IS 542\semester_project\src\components\RecipeForm.tsx) with minimal markup changes: ingredient rows now
  use a small wrapper structure so the Ingredient and Measurement inputs can sit on the same line and the action buttons sit below them, and the instruction field is now a textarea
  instead of an input.

  Updated [App.css](C:\Users\prest\Documents\College\MISM Semester 4\IS 542\semester_project\src\styling\App.css) to support that layout and to style textarea the same way as the
  existing form controls. npm run build passed.
```
