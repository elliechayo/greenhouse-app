import { useState } from "react";
import styled from "@emotion/styled";

// icons
import { AiOutlineClose } from "react-icons/ai";

export default function WishList({ wishListProp }) {
  const [wishList, setWishList] = useState(wishListProp);

  const handleDelete = (id) => {
    setWishList(wishList.filter((e) => e.id !== id));
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
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    {item.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                  </td>
                  <td>
                    <button>ADD TO CART</button>
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
      background: #333;
      color: white;
      padding: 10px;
    }

    td img {
      max-width: 150px;
    }
  }
`;
