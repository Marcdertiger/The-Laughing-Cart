# How this project's  boilerplate was setup

## Rails Backend

1. Create Rails Project
```
# ensure you ruby and version manager such as rvm (used in this project)
sudo gem install rails
rails new the-laughing-cart-backend --api --database=postgresql
```

2. Set some things in the default gemfile we will use later
```
# ENV management
# To avoid having keys in plain test when developing/pushing code to github
gem 'dotenv-rails', groups: [:development, :test]

# CORS support for frontend-backend communication
# just uncomment this from the default generated gemfile
gem 'rack-cors'

# HTTP clients for Smile.io API calls
gem 'faraday' # or you could use 'faraday' if you prefer

gem 'jwt'

# Run against this stable release
group :development, :test do
  gem 'rspec-rails', '~> 8.0.0'
end
```

3. Install dependencies
```
bundle install
```

4. Install/Setup RSpec
```
rails generate rspec:install
```

5. Setup CORS, in `config/initializers/cors.rb` for github pages front end we will use later in production, and localhost 3000 for development
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(
      Rails.env.production? ? 'https://marcdertiger.github.io' : 'http://localhost:3000'
    )

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

```

6. Add this to load local variables via .env file in `application.rb`
```
# Load local environment variables
Dotenv::Railtie.load if defined?(Dotenv)
```

7. Setup postgres in `config/database.yml`, production url is in the format expected by fly.io
```
default: &default
  adapter: postgresql
  encoding: unicode
  username: <%= ENV['POSTGRES_USER'] %>
  password: <%= ENV['POSTGRES_PASSWORD'] %>
  host: localhost

development:
  <<: *default
  database: the_laughing_cart_backend_development

test:
  <<: *default
  database: the_laughing_cart_backend_test

production:
  <<: *default
  url: <%= ENV['DATABASE_URL'] %>
```

8. Create a .env file to store local development keys
```
POSTGRES_USER=your_username_local_db
POSTGRES_PASSWORD=your_password_local_db
SMILE_API_KEY=your_real_test_smile_private_key_here
```

Then add .env* to .gitignore

9. Set default server port to 3001 in config/puma.rb
```
# Specifies the `port` that Puma will listen on to receive requests; default is 3000.
port ENV.fetch("PORT", 3001)
```
## React + Typescript front-end


1. Create the react app using CRA
```
npx create-react-app the-laughing-cart-frontend --template typescript
cd the-laughing-cart-frontend
```

2. Install tailwind
```
npm install -D tailwindcss@3
npx tailwindcss init
```

3. update `tailwind.config.js` 
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind to Your CSS
Open src/index.css and add the Tailwind directives:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```


4. Install axios for API calls
```
npm install axios
```
Some setup will be done later for this one

5.Create some local variables to make local testing and deployment easy
  5A. In your frontend directory add a .env.development file with:
  ```
  REACT_APP_API_BASE_URL=http://localhost:3001
  ```
  5B. In your frontend directory add a .env.development file with:
  ```
  REACT_APP_API_BASE_URL=https://your-api.fly.dev
  ```

6. Create a base API client
Create new folder api in src
Create client.ts file in it.
```
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default api;
```

7. Install github pages
```
npm install --save-dev gh-pages
```

8. Configure package.json for github pages and more
Add this:
```
"homepage": "https://<your-username>.github.io/<your-repo-name>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```