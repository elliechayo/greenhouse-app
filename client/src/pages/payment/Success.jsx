import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../../graphql/queries";
import { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  let cartItems = null;

  if (user.id && cartItems === null) {
    cartItems = user.cart;
  }

  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    const handleAddOrder = async () => {
      const { data } = await addOrder({
        variables: {
          products: cartItems.map((e) => ({
            id: e.id,
            quantity: e.stockQuantity,
          })),
          createdBy: user.id,
          totalPrice: cartItems
            .reduce((a, b) => (a += b.price * b.stockQuantity), 0)
            .toString(),
        },
      });
      if (data.addOrder) {
        toast.success("Order created!");
        dispatch({
          type: "SET_USER",
          payload: {
            user: { ...user, cart: [] },
          },
        });
      }
    };
    if (cartItems) {
      handleAddOrder()
        .then(() => {
          navigate("/account?view=cart");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [addOrder, user, dispatch, cartItems, navigate]);
  return <></>;
}
