const { gql } = require("apollo-server-express");

// Create a schema
const typeDefs = gql`
  type User {
    id: ID
    socialTitle: String
    firstName: String
    lastName: String
    email: String
    dateOfBirth: String
    postedPlants: [Product]
    wishlist: [Product]
    cart: [Product]
  }

  type Product {
    name: String
    rating: Int
    category: String
    description: String
    image: String
    stockQuantity: Int
    longDescription: String
    price: String
    id: ID
    userId: String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    user(id: ID!): User
  }

  type TokenWithUser {
    token: String
    user: User
  }

  type Mutation {
    addProduct(
      name: String!
      category: String!
      description: String!
      longDescription: String!
      price: String!
      image: String!
      userId: String!
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      category: String
      longDescription: String
      price: String
      image: String
    ): Product
    deleteProduct(id: ID!): Product
    signupUser(
      socialTitle: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      dateOfBirth: String!
    ): User
    loginUser(email: String!, password: String!): TokenWithUser
    addToWishlist(productId: ID!, userId: ID!): User
    addToCart(productId: ID!, userId: ID!, quantity: Int!): User
    removeFromCart(productId: ID!, userId: ID! ): User
    updateCartItemQuantity(cartItemId: ID!, userId: ID!, quantity: Int! ): User
  }
`;

module.exports = typeDefs;
