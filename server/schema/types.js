const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    socialTitle: String
    firstName: String
    lastName: String
    email: String
    dateOfBirth: String
    shippingAddress: String
    billingAddress: String
    password: String
    wishList: [Product]
    cart: [Product]
  }

  type TokenWithUser {
    token: String
    user: User
  }

  type Product {
    id: ID
    name: String
    rating: Int
    category: String
    description: String
    image: String
    stockQuantity: String
    longDescription: String
    price: String
    createdBy: String
    createdAt: String
  }

  type OrderProduct {
    id: String
    quantity: String
  }

  input OrderInput {
    id: String
    quantity: String
  }

  type Order {
    id: ID
    products: [OrderProduct]
    createdBy: String
    totalPrice: String
    status: String
    createdAt: String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    productsByUser(id: ID!): [Product]
    user(id: ID!): User
    ordersByUser(id: ID!): [Order]
  }

  type Mutation {
    registerUser(
      socialTitle: String
      firstName: String
      lastName: String
      email: String
      password: String
      dateOfBirth: String
    ): User

    loginUser(email: String!, password: String!): TokenWithUser

    updateUser(
      email: String
      socialTitle: String
      firstName: String
      lastName: String
      dateOfBirth: String
      shippingAddress: String
      billingAddress: String
    ): User

    addProduct(
      name: String
      category: String
      description: String
      longDescription: String
      price: String
      image: String
      createdBy: String
      createdAt: String
    ): Product

    removeProduct(productId: ID!): Product
    addToWishList(productId: ID!, userId: ID!): User
    removeFromWishList(productId: ID!, userId: ID!): User
    removeFromCart(productId: ID!, userId: ID!): User
    addToCart(productId: ID!, userId: ID!, quantity: String): User
    addOrder(products: [OrderInput], createdBy: ID!, totalPrice: String): Order
  }
`;

module.exports = typeDefs;
