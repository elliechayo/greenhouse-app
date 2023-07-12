import { useState } from "react";
import { backend_URL } from "../../config";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART, REMOVE_FROM_WISHLIST } from "../../graphql/queries";

// icons
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

export default function WishList({ user, dispatch, setUser }) {
  const [wishList, setWishList] = useState(user.wishList);
  const [removeFromWishList] = useMutation(REMOVE_FROM_WISHLIST);
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleDelete = async (id) => {
    setWishList(wishList.filter((e) => e.id !== id));
    try {
      const { data } = await removeFromWishList({
        variables: {
          userId: user.id,
          productId: id,
        },
      });
      if (data?.removeFromWishList) {
        toast.success("Removed from wishlist");
        dispatch({
          type: "SET_USER",
          payload: {
            user: data.removeFromWishList,
          },
        });
        setUser(data.removeFromWishList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const { data } = await addToCart({
        variables: {
          productId: id,
          userId: user.id,
          quantity: "1",
        },
      });
      if (data?.addToCart) {
        toast.success("Added to Cart");
        dispatch({
          type: "SET_USER",
          payload: {
            user: data.addToCart,
          },
        });
        setUser(data.addToCart);
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.toString() === "Product already exists") {
        toast.error(error.message);
      }
    }
  };

  return (
    <SectionWrapper>
      <table>
        <thead>
          <tr>
            <th>Remove</th>
            <th>Images</th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Stock Status</th>
            <th>Add To Cart</th>
          </tr>
        </thead>
        <tbody>
          {wishList &&
            wishList.map((item) => {
              return (
                <tr key={item.id}>
                  <td onClick={() => handleDelete(item.id)}>
                    <AiOutlineClose />
                  </td>
                  <td>
                    <img
                      src={`${backend_URL}/uploads/${item.image}`}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    {item.stockQuantity > 0 ? "In stock" : "Out of stock"}
                  </td>
                  <td>
                    <button onClick={() => handleAddToCart(item.id)}>
                      ADD TO CART
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  overflow: auto;
  width: 100%;

  table {
    width: 100%;
    border: 1px solid lightgray;
    border-collapse: collapse;
    min-width: 300px;

    tr,
    td,
    th {
      border: 1px solid lightgray;
      padding: 20px 10px;
      border-collapse: collapse;
      font-size: 15px;
      text-align: center;
    }

    td svg {
      margin: 0 auto;
      cursor: pointer;

      &:hover {
        color: var(--green-medium);
      }
    }

    th {
      font-weight: bolder;
    }

    td button {
      background: var(--green-medium);
      border-radius: 5px;
      color: white;
      padding: 10px;

      &:hover {
        background: var(--dark-bg);
      }
    }

    td img {
      max-width: 150px;
    }
  }
`;
