Here is a draft README for your plant application project:

# Greenhouse

Greenhouse is an e-commerce plant store allowing users to buy and sell plants online. 

## Description

This project was built by as part of a full MERN project. It demonstrates competency with building an interactive MERN stack single page application.

Greenhouse allows users to:

- Browse plants by category and view detailed plant information
- Add plants to a shopping cart 
- Checkout and purchase plants through Stripe integration
- Create an account to track order history and inventory
- List plants for sale by uploading images and providing descriptions
- View profile with purchase history and "plant score" title

The application utilizes:

- React for the front-end UI with React Router
- GraphQL API built with Node.js and Express
- MongoDB and Mongoose for the database and models
- JWT authentication for account creation and login
- Apollo Server to connect the React front-end and MongoDB backend

User input is handled through forms for signup, login, creating plant listings, and checkout. Real-time updates are implemented using GraphQL queries and mutations.

The codebase implements best practices like:

- Modular components 
- Reusable UI elements
- Object-oriented modeling
- Declarative data fetching
- Environmental variables
- Test coverage

The frontend UI is styled with Semantic UI and is fully responsive across devices.

Overall this project showcases full stack development skills and the ability to build a polished MERN application.


## Installation

To run the app locally:

1. Clone the repository
2. Run `npm install` in the root folder 
3. Create a `.env` file with the necessary environment variables
4. Run `npm run develop` to start the dev server
