import { Link } from "react-router-dom";
import { backend_URL } from "../../config";
import { Box, Stack, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";

// icons
import {
  PiShoppingCartSimpleLight,
  PiEyeLight,
  PiHeartLight,
} from "react-icons/pi";
import { useMutation } from "@apollo/client";
import { ADD_TO_WISHLIST, ADD_TO_CART } from "../../graphql/queries";
import { toast } from "react-toastify";

export default function ProductCard({ product, user }) {
  const [addToWishList] = useMutation(ADD_TO_WISHLIST);
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleAddToWishList = async () => {
    try {
      const { data } = await addToWishList({
        variables: {
          productId: product.id,
          userId: user.id,
        },
      });
      if (data?.addToWishList) {
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.toString() === "Product already exists") {
        toast.error(error.message);
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      const { data } = await addToCart({
        variables: {
          productId: product.id,
          userId: user.id,
          quantity: "1",
        },
      });
      if (data?.addToCart) {
        toast.success("Added to Cart");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.toString() === "Product already exists") {
        toast.error(error.message);
      }
    }
  };

  return (
    <ProductLI>
      <Stack className="image-section">
        <img
          src={`${backend_URL}/uploads/${product.image}`}
          alt={product.title}
        />
        <Box className="button-group">
          <Tooltip label="Add to wishlist">
            <button onClick={handleAddToWishList}>
              <PiHeartLight fontSize={22} />
            </button>
          </Tooltip>

          <Tooltip label="QuickView">
            <Link to={`/products/${product.id}`}>
              <PiEyeLight fontSize={22} />
            </Link>
          </Tooltip>

          <Tooltip label="Add to cart">
            <button onClick={handleAddToCart}>
              <PiShoppingCartSimpleLight fontSize={22} />
            </button>
          </Tooltip>
        </Box>
      </Stack>
      <Stack className="text-section">
        <h3 className="title">{product.name}</h3>
        <h2 className="price">${product.price}</h2>
        <p>{product.rating > 0 ? "⭐".repeat(product.rating) : "No Rating"}</p>
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

  .button-group a,
  .button-group button {
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
