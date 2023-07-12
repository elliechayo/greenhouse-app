import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Mutation(
    $socialTitle: String
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $dateOfBirth: String
  ) {
    registerUser(
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

export const LOGIN_USER = gql`
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
        shippingAddress
        billingAddress
        wishList {
          id
          name
          category
          price
          description
          longDescription
          rating
          stockQuantity
          image
        }
        cart {
          id
          name
          category
          price
          description
          longDescription
          rating
          stockQuantity
          image
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      shippingAddress
      billingAddress
      wishList {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
      cart {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation(
    $email: String
    $firstName: String
    $lastName: String
    $dateOfBirth: String
    $socialTitle: String
    $shippingAddress: String
    $billingAddress: String
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      socialTitle: $socialTitle
      shippingAddress: $shippingAddress
      billingAddress: $billingAddress
    ) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      shippingAddress
      billingAddress
      wishList {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
      cart {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
    }
  }
`;

// Product queries
export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String
    $category: String
    $description: String
    $longDescription: String
    $image: String
    $price: String
    $createdBy: String
  ) {
    addProduct(
      name: $name
      category: $category
      description: $description
      longDescription: $longDescription
      price: $price
      image: $image
      createdBy: $createdBy
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
      createdBy
      createdAt
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query Query($id: ID!) {
    product(id: $id) {
      id
      name
      category
      price
      description
      longDescription
      rating
      stockQuantity
      image
      createdAt
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query Query {
    products {
      id
      name
      category
      price
      description
      longDescription
      rating
      stockQuantity
      image
      createdAt
    }
  }
`;

export const GET_PRODUCTS_BY_USER = gql`
  query Query($id: ID!) {
    productsByUser(id: $id) {
      id
      name
      category
      price
      description
      longDescription
      rating
      stockQuantity
      image
      createdAt
    }
  }
`;

export const GET_ORDERS_BY_USER = gql`
  query Query($id: ID!) {
    ordersByUser(id: $id) {
      products {
        id
        quantity
      }
      createdBy
      status
      totalPrice
      createdAt
      id
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation Mutation($productId: ID!, $userId: ID!) {
    addToWishList(productId: $productId, userId: $userId) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      shippingAddress
      billingAddress
      wishList {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
      cart {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation Mutation($productId: ID!, $userId: ID!, $quantity: String) {
    addToCart(productId: $productId, userId: $userId, quantity: $quantity) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      shippingAddress
      billingAddress
      wishList {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
      cart {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation Mutation($productId: ID!, $userId: ID!) {
    removeFromWishList(productId: $productId, userId: $userId) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      shippingAddress
      billingAddress
      wishList {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
      cart {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation Mutation($productId: ID!, $userId: ID!) {
    removeFromCart(productId: $productId, userId: $userId) {
      id
      socialTitle
      firstName
      lastName
      email
      dateOfBirth
      shippingAddress
      billingAddress
      wishList {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
      cart {
        id
        name
        category
        price
        description
        longDescription
        rating
        stockQuantity
        image
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation Mutation(
    $products: [OrderInput]
    $createdBy: ID!
    $totalPrice: String
  ) {
    addOrder(
      products: $products
      createdBy: $createdBy
      totalPrice: $totalPrice
    ) {
      products {
        id
        quantity
      }
      createdBy
      totalPrice
      status
      createdAt
    }
  }
`;
