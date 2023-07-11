// Import models
const Product = require("../model/ProductModel");
const User = require("../model/UserModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a root resolver
const resolvers = {
  Query: {
    products: async () => {
      // Fetch all products
      const products = await Product.find();
      return products;
    },
    product: async (_, { id }) => {
      const product = await Product.findById(id);

      return product;
    },
    user: async (_, { id }) => {
      // Fetch a user by ID
      const user = await User.findById(id);
      return user;
    },
  },
  Mutation: {
    addProduct: async (
      _,
      { name, category, description, longDescription, price, image, userId }
    ) => {
      // Create a new product
      const product = new Product({
        name,
        category,
        description,
        longDescription,
        price,
        image,
        rating: 0,
        stockQuantity: 0,
        userId,
      });
      await product.save();

      const user = await User.findById(userId);
      if (user) {
        user.postedPlants.push(product);
        await user.save();
      } else {
        return "User not found";
      }

      return product;
    },
    updateProduct: async (
      _,
      { id, name, category, description, longDescription, price, image }
    ) => {
      // Find the product by ID and update its fields
      const product = await Product.findByIdAndUpdate(
        id,
        { name, category, description, longDescription, price, image },
        { new: true }
      );
      return product;
    },
    deleteProduct: async (_, { id }) => {
      // Find the product by ID and delete it
      const product = await Product.findByIdAndDelete(id);
      return product;
    },
    signupUser: async (
      _,
      { socialTitle, firstName, lastName, email, password, dateOfBirth }
    ) => {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already registered");
      }

      if (password.length < 6) {
        throw new Error("Password length must be at least 6");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
        socialTitle,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        dateOfBirth,
      });
      await user.save();

      return user;
    },
    loginUser: async (_, { email, password }) => {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Generate and return a JWT token
      const token = jwt.sign(
        { userId: user.id },
        "EEE241EEBSSBSBNIPORWNGOWENINROWQINRPQEJQRNINEQWTU",
        { expiresIn: "24h" }
      );

      return { token, user };
    },
    addToWishlist: async (_, { productId, userId }) => {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      // Check if the product is already in the wishlist
      const isProductInWishlist = user.wishlist.some(
        (wishlistItem) => wishlistItem.toString() === productId
      );
      if (isProductInWishlist) {
        throw new Error("Product is already in the wishlist");
      }

      // Add the product to the wishlist
      user.wishlist.push(product);
      await user.save();

      return user;
    },
    addToCart: async (_, { productId, userId, quantity }) => {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      // Check if the product is already in the wishlist
      const isProductInCart = user.cart.some(
        (cartItem) => cartItem.toString() === productId
      );
      if (isProductInCart) {
        throw new Error("Product is already in the cart");
      }

      product.stockQuantity = quantity;

      // Add the product to the wishlist
      user.cart.push(product);
      await user.save();

      return user;
    },
    removeFromCart: async (_, { productId, userId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Remove the product from the cart
      user.cart = user.cart.filter((item) => item._id.toString() !== productId);
      await user.save();

      return user;
    },
    updateCartItemQuantity: async (_, { cartItemId, userId, quantity }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Update the cart item quantity
      user.cart = user.cart.map((item) => {
        if (item._id.toString() === cartItemId) {
          return { ...item, stockQuantity: quantity };
        }
        return item;
      });

      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;
