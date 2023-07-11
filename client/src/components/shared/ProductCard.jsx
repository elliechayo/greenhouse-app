import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import UserContext from "../../context/user/userContext";

// icons
import {
  PiShoppingCartSimpleLight,
  PiEyeLight,
  PiHeartLight,
} from "react-icons/pi";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART, ADD_TO_WISHLIST } from "../../graphql/queries";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const [addToWishlist, { loading: wishlistLoading, error: wishlistError }] =
    useMutation(ADD_TO_WISHLIST);
  const [addToCart, { loading: cartLoading, error: cartError }] =
    useMutation(ADD_TO_CART);
  // user from state
  const { user } = useContext(UserContext);

  if (wishlistLoading || cartLoading) return <div></div>;
  if (wishlistError || cartError) {
    const error = wishlistError || cartError;
    toast.error(error.message || "Something went wrong");
  }

  function handleAddToWishlist() {
    if (!user?.id) {
      toast.error("Please login to continue");
      return;
    }
    try {
      addToWishlist({
        variables: {
          productId: product.id,
          userId: user.id,
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleAddToCart() {
    addToCart({
      variables: {
        productId: product.id,
        userId: user.id,
        quantity: 1,
      },
    });
  }

  return (
    <ProductLI>
      <Stack className="image-section">
        <img src={product.image} alt={product.title} />
        <Box className="button-group">
          <Tooltip label="Add to wishlist">
            <Link to="/">
              <PiHeartLight fontSize={22} onClick={handleAddToWishlist} />
            </Link>
          </Tooltip>

          <Tooltip label="QuickView">
            <Link to={`/products/${product.id}`}>
              <PiEyeLight fontSize={22} />
            </Link>
          </Tooltip>

          <Tooltip label="Add to cart">
            <Link to="/">
              <PiShoppingCartSimpleLight
                fontSize={22}
                onClick={handleAddToCart}
              />
            </Link>
          </Tooltip>
        </Box>
      </Stack>
      <Stack className="text-section">
        <h3 className="title">{product.name}</h3>
        <h2 className="price">${product.price}</h2>
        <p>{"⭐".repeat(product.rating)}</p>
      </Stack>
    </ProductLI>
  );
}

const ProductLI = styled.li`
  max-width: 250px;
  width: 100%;

  .image-section {
    position: relative;
  }

  .image-section img {
    max-width: 100%;
    height: 300px;
    border-radius: 5px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    position: absolute;
    bottom: 4px;
    left: 4px;
  }

  .button-group a {
    padding: 5px;
    background: white;
    box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    &:hover {
      background: var(--green-very-light);
      color: white;
    }
  }

  .text-section {
    margin-top: 10px;

    & .title {
      font-weight: bolder;
      font-size: 18px;
    }

    & .price {
      font-size: 18px;
      color: var(--green-medium);
      font-weight: bolder;
      line-height: 10px;
    }
  }
`;
