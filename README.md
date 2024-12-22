# PROJECT TITLE PaletGen

#### Video Demo: https://youtu.be/WO91xEQGMUw

#### Description:

AI color palette generator that can generate color palette from the image or your idea.

## Features

- [Feature 1]: Color palette generation from user prompt.
- [Feature 2]: Color palette generation from image.
- [Feature 3]: Color palette generation from both image and user prompt.

## Files and Structure

- **frontend/**: Contains the Next.js code for the frontend.
- **backend/**: Contains the Flask backend code.
- **README.md**: Documentation for the project.

## Key Design Decisions

- Gemini API for the image analyzing and generation of color palette.
- Nextjs for the frontend development
- Python Flask for the backend development

## Installation and Usage

### Prerequisites:

- Python 3.x <https://www.python.org/downloads/>
- Deno 2.x <https://docs.deno.com/runtime/getting_started/installation/>
- Google Gemini API <https://ai.google.dev/gemini-api/docs/api-key>

### Steps to Run:

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```
2. Run the Flask backend:
   ```bash
   cd backend
   echo "GEMINI_API=<your-api-key>" > .env
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirement.txt
   deactive
   source .venv/bin/activate
   flask run
   ```
3. Run the NextJS frontend:
   ```bash
   cd frontend
   deno install
   deno task dev
   ```

## The Explanation

### The Backend

- The Backend is the most simplest part of the project.
- First I create the bare minimal of a flask app. Then I have added the generate_palette route which call the Gemini API with the structure prompt that only generates the JSON. But the result contains an extra line "json" at the start of the JSON string and I decided to remove it using re.
- I also added three conditions for the users to generate the palette:

1. Image only
   When the client side request only with the image and without a prompt the server will continue with the image only prompt and
   return the color palette.
2. Prompt only
   It is also a possible condition for user to generated a color palette without an image. And so is my application.
3. Image & Prompt
   The best part of this application is combining the creative idea with a reference logo, so that user can get a beautiful personalized color palette.

### The Frontend

- The frontend setup is a bit more complex then the backend.
- I used the new javascript runtime "Deno 2.0" and Nextjs for the frontend and TailwindCSS for the styling together with Shadcn.
- The code in the files are:

1. Layout.tsx
   This is the layout file similar to the one we used in the class with JinJa. This layout covers the entire route, since mine is at the root the entire website will have the same main layout, which includes a navbar with logo.
2. Page.tsx
   This is the '/' route.
   The first few lines are import from the React and the Shadcn UI library.
   Then I defined my own custom type for the color palette data.

   ```
   type ThemeColors = {
      primary: string;
      secondary: string;
      accent: string;
      neutralLight: string;
      neutralDark: string;
      highlight: string;
      displayColors(): void;
   };
   ```

   Then I created the color palette class which will be used to store the color palette JSON generated from the backend.
   Now then all the requirements are done, the real function starts.
   This Home() function in react is the one that renders the UI.
   First I created the variable (useState in React).
   After that I create the function that is called when the submit button is pressed.
   Inside the function the first step is to check whether the form inputs are not null. If they are then I make the alert saying inputs should be given to the user.
   Next I created the form data object and append the image and prompt to the form data.
   Then I used axios to send the post request to the local host (the flask server running on my machine).
   If the response is OK then I destructured the JSON into the color variables.
   Then I created the color palette object with the values from the color variables.
   Then I assign the value to my result variable which will be used to render the result colors and hex cods.

   For the HTML part.

   - The form part:
     I have put the welcome message along with the short description of how to use the website.
     And the form inputs to get the image and prompt from the user.
     And the submit button.
   - The result part:
     The result part is hidden until the variable result is not Null.
     And when the result has a proper value they are shown in small div with each color and their hex code along with the color palette Name.

## And this was my CS50.
