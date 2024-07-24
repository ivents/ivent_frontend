# Folder Structure

## public

Contains media assets such as images

## src/components

Contains all the components of the application. Each component is a folder with the following structure:

- index.js: The main file of the component. It exports the component.
- index.css: The css file of the component, if applicable. It contains the styles of the component.

## src/pages

Contains all the pages of the application.

Every page falls into 3 categories:

- **public**: Pages that are accessible to everyone, without the need to log in.
- **user-specific**: Private pages specific to a regular user
- **host-specific**: Private pages specific to a host (event organiser)

Each page is a folder with the following structure:

- **index.js**: The main file of the page. It exports the page.
- **index.css**: The css file of the page, if applicable. It contains any styles specific to the page.
- **components**: A folder containing all the components used in the page.
