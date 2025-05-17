# The Laughing Cart

## Introduction

## Project Details

Let’s pretend you’re a small business owner who has just set up a new Shopify store and installed Smile. You’ve decided to create a standalone web-app (separate from your Shopify store) focused on showcasing your rewards program. This web app will make use of **Smile’s JavaScript SDK (Smile.js)** as well as **Smile’s Backend API** to power its functionality.

---

### ✅ General Requirements

- The app’s code must be hosted in a **GitHub repository**, and the following users must be given read access:
  - `lucasprag` (Lucas)
  - `andrewpye` (Andy)
  - `michellecolin` (Michelle)

- Any scaffolded/boilerplate/framework code should be committed to the **main branch**. The code you write/customize for the project should be available in a **separate branch**. Submit your work via a **Pull Request**.

- You can use any language/framework (Smile prefers **Ruby for backend** and **React for frontend**), but:
  - Your app must make backend API calls using a **private API token**
  - The token **must never be exposed to the client**

- The app must be **deployed** and publicly accessible on the internet.
  - Smile will reimburse **$25 CAD** for any hosting costs (no receipt submission needed)

- Smile.js should be **initialized on the page** using your Smile account details and authenticated as the **sample customer** (details below)

- **No authentication/login system** is required

- The app should be **standalone**, not embedded in or part of your Shopify store

---

### 🧠 Things to Keep in Mind

This isn’t a production-level app, but we want to see **production-level thinking**:

- Clear and thoughtful **code structure**
- Good **separation of concerns**
- **Secure handling** of data

Make sure all core features work as described and align with both the **intent** and **expected behavior**.

---

### 🎟️ Feature: Redeeming for a Reward

- The homepage should:
  - Display the **customer’s current points balance**
  - Show a **list of available redemption options**
    - Indicate whether the customer has enough points to redeem each option

- Clicking a reward should:
  - Redeem points
  - Display the **coupon code** to the customer

---

### 🧮 Feature: Math Question

- The homepage should show a **simple math question** (e.g., `5 + 5`)
  - The numbers should be **randomized** on every page load

- Correct answers should:
  - **Reward 50 points** to the customer

---

### 💰 Feature: Manual Points Issuing

- When viewing the app with the query param `?admin=true`, show a **button** to:
  - Add or remove an arbitrary number of points

- After modification:
  - Display a **confirmation message**
  - Refresh and display the updated **points balance**

---

### 💡 Tips

- Smile’s **Developer Hub** contains all technical documentation:
  - The **Fundamentals** section is particularly helpful
  - Help docs cover less technical details (e.g., where to find API keys)

- Choose between **Smile.js** and the **Backend API** for each feature depending on what's most appropriate

- Your **deployment setup** won’t be evaluated—use what you’re comfortable with

- Think of this as an **MVP**. If you make intentional trade-offs, **note them in your PR**

---

### 💬 Communication

- Ask questions & give status updates in the **Slack channel**
- Core working hours: **9 AM – 5 PM ET, Mon–Fri**
- Feel free to post in the channel any time—notifications are quiet outside hours

#### When finished:

1. Open a **PR** for your project branch
2. Include:
   - A **live link** to the deployed app
   - A **disclaimer** on AI tool usage (e.g., Copilot is fine, just don’t outsource the whole thing to Claude)
3. Tag:
   - `@lucasprag`
   - `@andrewpye`
   - `@michellecolin`
4. Notify the team in Slack

After review, we’ll schedule time to chat and give feedback.

---

### 🛒 Your Shopify Store

- **Admin URL:** [http://marc-andre-smile.myshopify.com/admin](http://marc-andre-smile.myshopify.com/admin)
- **Frontend URL:** [http://marc-andre-smile.myshopify.com/](http://marc-andre-smile.myshopify.com/)
- **Store Frontend Password:** `smile`

---

### 🙂 Your Smile Account

- In your Shopify Admin, click **Apps** > **Smile.io**
- This is referred to as **“Smile Admin”** (where you manage your rewards program)

---

### 🛍️ Sample Customer (For Logged-In State)

1. Visit your Shopify store frontend
2. Go to the **login page**
3. Use your email to request a **magic link** and login
4. Click **“Go to store”** in the top-right corner
5. You should see a floating **“Rewards” button**
   - Click it to view a **zero-point balance**
   - This creates a new customer in both Shopify and Smile

Use this **customer** for the logged-in state in your standalone app.

---

If anything is unclear, don’t hesitate to reach out—both @lucasprag and @andy are here to help! 🙌


## AI Use Disclainer
Here are the ways I have used LLM based tools during this project
1. Make creating the boilerplate quickly based on my initial deployment and stack choices. 
2. Edit or format documentation. 
3. Provide examples on things I am less familiar with or rusty


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

Add a PostgreSQL database:
`fly postgres create --name the-laughing-cart-db`

Attach it to your app:
`fly postgres attach --app the-laughing-cart-backend --postgres-app the-laughing-cart-db`

Deploy:
`fly deploy`


### Github Pages Front-End

Use this command to automatically deploy to git pages based on the location set in the homepage package.json variable of your front-end
```
npm run build
npm run deploy
```