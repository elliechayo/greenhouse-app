import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query Query {
    products {
      category
      description
      id
      image
      name
      longDescription
      price
      rating
      stockQuantity
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query Query($productId: ID!) {
    product(id: $productId) {
      category
      description
      id
      image
      longDescription
      name
      price
      rating
      stockQuantity
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $category: String!
    $description: String!
    $longDescription: String!
    $price: String!
    $image: String!
    $userId: String!
  ) {
    addProduct(
      name: $name
      category: $category
      description: $description
      longDescription: $longDescription
      price: $price
      image: $image
      userId: $userId
    ) {
      name
      rating
      category
      description
      image
      stockQuantity
      longDescription
      price
      id
      userId
    }
  }
`;

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      postedPlants {
        name
        rating
        category
        description
        image
        stockQuantity
        longDescription
        price
        id
        userId
      }
      cart {
        name
        rating
        category
        description
        image
        stockQuantity
        longDescription
        price
        id
        userId
      }
      wishlist {
        name
        rating
        category
        description
        image
        stockQuantity
        longDescription
        price
        id
        userId
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($productId: ID!, $userId: ID!) {
    addToWishlist(productId: $productId, userId: $userId) {
      dateOfBirth
      email
      firstName
      id
      lastName
      socialTitle
      wishlist {
        name
        rating
        category
        description
        image
        stockQuantity
        longDescription
        price
        id
        userId
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $userId: ID, $quantity: Int) {
    addToCart(productId: $productId, userId: $userId, quantity: $quantity) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      cart {
        name
        rating
        category
        description
        image
        stockQuantity
        longDescription
        price
        id
        userId
      }
      postedPlants {
        name
        rating
        category
        description
        image
        stockQuantity
        longDescription
        price
        id
        userId
      }
      wishlist {
        name
        rating
        category
        description
        image
        stockQuantity
        longDescription
        price
        id
        userId
      }
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation Mutation(
    $socialTitle: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $dateOfBirth: String!
  ) {
    signupUser(
      socialTitle: $socialTitle
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      dateOfBirth: $dateOfBirth
    ) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
    }
  }
`;

export const LOG_IN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        socialTitle
        firstName
        lastName
        email
        dateOfBirth
      }
    }
  }
`;
