const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// models
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const user = await User.findOne({ _id: id });
      return user;
    },
    product: async (_, { id }) => {
      const p = await Product.findOne({ _id: id });
      if (!p) {
        throw new Error("Cannot find product");
      }
      return p;
    },
    products: async () => {
      const products = await Product.find({});
      return products;
    },
    productsByUser: async (_, { id }) => {
      const products = await Product.find({ createdBy: id });
      return products;
    },
    ordersByUser: async (_, { id }) => {
      const orders = await Order.find({ createdBy: id });
      return orders;
    },
  },
  Mutation: {
    // user mutations
    registerUser: async (
      _,
      { socialTitle, firstName, lastName, email, password, dateOfBirth }
    ) => {
      if (!socialTitle || !firstName || !email || !password || !dateOfBirth) {
        throw new Error("Please include all fields");
      }

      // hash the password using 10 salt rounds
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        socialTitle,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        dateOfBirth,
      });
      // throw error if no user is created
      if (!newUser) {
        throw new Error("Error creating user");
      }
      return newUser;
    },

    loginUser: async (_, { email, password }) => {
      if (!email || !password) throw new Error("Please include all fields");

      // get the user from DB using email
      const user = await User.findOne({ email });
      // throw error, if no user found
      if (!user) {
        throw new Error("Invalid Credentials");
      }

      // throw error if passwords don't match
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }

      // sign the token and return it
      const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
        expiresIn: "24h",
      });

      return { token, user };
    },

    updateUser: async (
      _,
      {
        socialTitle,
        firstName,
        lastName,
        email,
        dateOfBirth,
        shippingAddress,
        billingAddress,
      }
    ) => {
      const user = await User.findOneAndUpdate(
        { email },
        {
          socialTitle,
          firstName,
          lastName,
          email,
          dateOfBirth,
          shippingAddress,
          billingAddress,
        },
        { new: true }
      );
      return user;
    },

    // products mutations
    addProduct: async (
      _,
      { name, category, description, longDescription, price, image, createdBy }
    ) => {
      const product = Product.create({
        name,
        description,
        category,
        longDescription,
        price,
        image,
        createdBy,
      });
      return product;
    },

    addToWishList: async (_, { productId, userId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const product = await Product.findById(productId).lean();
      if (!product) {
        throw new Error("Product not found");
      }
      const alreadyExistsInWishList = user.wishList.some(
        (e) => e._id.toString() == productId
      );
      if (alreadyExistsInWishList) {
        throw new Error("Product already exists");
      }

      product.id = product._id;
      user.wishList.push(product);
      await user.save();
      return user;
    },

    removeFromWishList: async (_, { productId, userId }) => {
      const user = await User.findById(userId);
      user.wishList = user.wishList.filter(
        (e) => e._id.toString() !== productId
      );
      await user.save();
      return user;
    },

    addToCart: async (_, { productId, userId, quantity }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const product = await Product.findById(productId).lean();
      if (!product) {
        throw new Error("Product not found");
      }
      const alreadyExistsInCart = user.cart.some(
        (e) => e._id.toString() == productId
      );

      if (alreadyExistsInCart) {
        throw new Error("Product already exists");
      }

      product.id = product._id;
      product.stockQuantity = quantity;
      user.cart.push(product);
      await user.save();

      return user;
    },

    removeFromCart: async (_, { productId, userId }) => {
      const user = await User.findById(userId);
      user.cart = user.cart.filter((e) => e._id.toString() !== productId);
      await user.save();
      return user;
    },

    addOrder: async (_, { products, createdBy, totalPrice }) => {
      const order = await Order.create({
        products,
        createdBy,
        totalPrice,
      });
      if (order) {
        const user = await User.findById(createdBy);
        user.cart = [];
        await user.save();
      }
      return order;
    },
  },
};

module.exports = resolvers;
