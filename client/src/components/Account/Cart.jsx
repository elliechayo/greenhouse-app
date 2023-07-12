import { useState } from "react";
import { backend_URL, homepage_URL, priceId } from "../../config";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_CART } from "../../graphql/queries";
import getStripe from "../../lib/getStripe";

// icons
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Cart({ user, dispatch, setUser }) {
  const [cartItems, setCartItems] = useState(user.cart);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);

  const handleDelete = async (id) => {
    setCartItems(cartItems.filter((e) => e.id !== id));
    try {
      const { data } = await removeFromCart({
        variables: {
          userId: user.id,
          productId: id,
        },
      });
      if (data?.removeFromCart) {
        toast.success("Removed from cart");
        dispatch({
          type: "SET_USER",
          payload: {
            user: data.removeFromCart,
          },
        });
        setUser(data.removeFromCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      // stripe payment
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        successUrl: `${homepage_URL}/payment/success`,
        mode: "payment",
        cancelUrl: `${homepage_URL}/payment/failure`,
      });
      console.log(error);
      return;
    } catch (error) {
      console.error(error);
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
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item) => {
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
                  <td>{item.stockQuantity || 1}</td>
                  <td>${item.price * (item.stockQuantity || 1)}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              ${cartItems.reduce((a, b) => (a += b.price * b.stockQuantity), 0)}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="checkoutBtn" onClick={handleCheckout}>
        Place Your Order
      </button>
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
      background: #333;
      color: white;
      padding: 10px;
    }

    td img {
      max-width: 150px;
    }
  }

  .checkoutBtn {
    padding: 10px;
    background: Var(--green-medium);
    color: white;
    margin-top: 10px;
  }
`;
