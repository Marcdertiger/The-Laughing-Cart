# The Laughing Cart

## Introduction

[Project Details](PROJECT.md)

## Production Link
The server can take a little to spin up sometimes, just give it a few seconds and a reload should do it.
[Click Here](https://marcdertiger.github.io/The-Laughing-Cart/)

## Boilerplate Details
[Click Here](BOILERPLATE.md)

## AI Use Disclainer
Here are the ways I have used LLM based tools during this project
1. Make creating the boilerplate quickly based on my initial deployment and stack choices. 
2. Edit or format documentation. 
3. Provide examples on things I am less familiar with or rusty, mostly front-end
4. Used to quickly template a simple site and styling to save time
5. Provided the smile.io SDK and API definitions and queries on how to implement some low level items
6. No code vibing & a concious effort to avoid reliance on AI for the problem parts of the project.


## Initial Decisions - Deployment & Stack
- Ruby on Rails API backend
  - hosted on fly.io
  - posgtesql database, since I am familiar
  - RSpec for very basic tests since it isn't a requirement for this project
    
- React + Typescript front end
  - hosted on git pages
  - Tailwind css
  - Typescript as I could use the refresher
  - No fancy packaging, just use CRA for simplicity
 

## Design Decisions & Trade-offs

- No testing was added to stay within time constraint
- No elaborate environment setup, only dev+prod
- No caching, CDN or more advanced at scale tech
- No use of react context or more elaborate state management concepts
  - I just build component by componenent and ran out of time to refactor into how it should actually be (state management)

## Known Issues and Improvements
- Front end needs a global context to handle customer data to prevent multiple fetching at component level
  and provide easy reloading of the customer whenever actions are taken
  - Using react context, or redux or hooks (maybe) could have worked better than the very non-ideal implementation I have here. 


## Running Locally
### Frontend
1. Set a .env.development file with the following
```
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_SMILE_CHANNEL_KEY=your_smile_channel_key
REACT_APP_SMILE_CUSTOMER_ID=your_existing_customer_id
```

2. Set a .env.production file with the folowing
```
REACT_APP_API_BASE_URL=https://your-api.fly.dev
REACT_APP_SMILE_CHANNEL_KEY=your_smile_channel_key
REACT_APP_SMILE_CUSTOMER_ID=your_existing_customer_id
```
Note: This is to fake auth and just use a hard coded customer ID instead

3. Run the front end server
`npm start`

### Backend
#### Set Environment Variables
1. Rails server: You need to set the following variables in your .env file locally: 
```
POSTGRES_USER=your_username_local_db
POSTGRES_PASSWORD=your_password_local_db
SMILE_API_PRIVATE_KEY=your_real_test_smile_private_key_here
LAUGHING_CART_API_KEY=your_real_smile_api_key_here
ENVIRONMENT=development
SMILE_MATH_MINIGAME_ACTIVITY_ID=custom_activity_id_for_minigame_you_created_here
```
#### Run command
`rails s`


## Deploy to Production
Be in the right branch you want to deploy before you start

### Fly.io Backend
Add the SMILE_API_KEY to your secrets. 

Install the CLI:
`brew install flyctl`

Login:
`fly auth login`

Initialize the app:
`fly launch`

Add a PostgreSQL database(if fly launch didn't do it):
`fly postgres create --name the-laughing-cart-db`

Attach it to your app(if fly launch didn't do it):
`fly postgres attach --app the-laughing-cart-backend --postgres-app the-laughing-cart-db`

Deploy:
`fly deploy`


### Github Pages Front-End

Use this command to automatically deploy to git pages based on the location set in the homepage package.json variable of your front-end
```
npm run build
npm run deploy
```