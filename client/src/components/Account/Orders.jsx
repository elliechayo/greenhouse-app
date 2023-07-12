import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { GET_ORDERS_BY_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function Orders({ user }) {
  const [orders, setOrders] = useState(null);
  const { data, loading } = useQuery(GET_ORDERS_BY_USER, {
    variables: { id: user.id },
    fetchPolicy: "no-cache",
  });

  if (data && !orders) {
    setOrders(data.ordersByUser);
  }
  if (loading) {
    return <>Loading...</>;
  }

  return (
    <SectionWrapper>
      <h3 className="title">My Orders</h3>
      <table>
        <thead>
          <tr>
            <th>ORDER</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((o) => {
            return (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(+o.createdAt).toDateString()}</td>
                <td>{o.status}</td>
                <td>
                  ${o.totalPrice} for {o.products.length} items
                </td>
                <td>
                  <Link to="/orders">View</Link>
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
  border: 1px solid lightgray;
  padding: 20px;
  overflow: auto;

  .title {
    font-size: 22px;
    color: #333;
  }

  table {
    margin-top: 20px;
    border: 1px solid lightgray;
    width: 100%;
    min-width: 300px;

    th,
    tr,
    td {
      border: 1px solid lightgray;
      text-align: center;
    }

    th,
    td {
      padding: 10px;
    }

    & a {
      color: white;
      background: var(--green-medium);
      padding: 10px;
      border-radius: 5px;

      &:hover {
        background: var(--dark-bg);
      }
    }
  }
`;
