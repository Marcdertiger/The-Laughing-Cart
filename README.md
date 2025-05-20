# The Laughing Cart

## Introduction

[Project Details](PROJECT.md)


## AI Use Disclainer
Here are the ways I have used LLM based tools during this project
1. Make creating the boilerplate quickly based on my initial deployment and stack choices. 
2. Edit or format documentation. 
3. Provide examples on things I am less familiar with or rusty, mostly front-end
4. Used to quickly template a simple site and styling to save time
5. Provided the smile.io SDK and API definitions and queries on how to implement some low level items
6. No copy paste of large amounts of code / no code vibing / avoid reliance on AI for the problem parts of the project.


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
  - I'm very rusty on those and used ChatGPT to help a little to get some basic triggers happening as an alternative
- 





## Running Locally
### Frontend
`npm start` will run the 

### Backend
#### Set Environment Variables
1. Rais server: You need to set the following variables in your .env file locally: 
```
POSTGRES_USER=marc-andrecouturier
POSTGRES_PASSWORD=password
SMILE_API_KEY=your_real_smile_private_key_here
```
#### Run command
`rails s`


## Deploy to Production
Be in the right branch you want to deploy before you start

### Fly.io Backend
Install the CLI:
`brew install flyctl`

Login:
`fly auth login`

Initialize the app:
`fly launch`

Add a PostgreSQL database(if fly launch didn't do it):
`fly postgres create --name the-laughing-cart-db`

tach it to your app(if fly launch didn't do it):
`fly postgres attach --app the-laughing-cart-backend --postgres-app the-laughing-cart-db`

Deploy:
`fly deploy`


### Github Pages Front-End

Use this command to automatically deploy to git pages based on the location set in the homepage package.json variable of your front-end
```
npm run build
npm run deploy
```