## `Project Description`

A small react app built to work with a provided external api for navigating, displaying and editing a folder structure.

## `Technical Decisions`

Decided to use FETCH API due to the small scope of the project. Other option was using Axios, but that would require more imports and for a small project like this I prefer to avoid external libraries if possible.

Decided not to spend any time on media queries or catering to different sizes and shapes of various devices for now. Outside of scope. App works on desktop sized screens.

Due to time constraints and the fact that the project doesn't require much frontend filtering or sorting functions, decided not to add any unit tests. Also was not in scope.

User feedback will be handled via a configurable modal.

## `Environment setup`

The base url will need to be added to the .env file. The variable name is REACT_APP_API_FOLDERS. In the env file bind the url to this variable and ensure that react has access to it via process.env.

## `Scripts`

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
