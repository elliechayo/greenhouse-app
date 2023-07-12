import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { GET_PRODUCTS_BY_USER } from "../../graphql/queries";
import { useState } from "react";

export default function PlantPosts({ user }) {
  const [plantPosts, setPlantPosts] = useState(null);
  const { data, loading } = useQuery(GET_PRODUCTS_BY_USER, {
    variables: { id: user.id },
    fetchPolicy: "no-cache",
  });

  if (data && !plantPosts) {
    setPlantPosts(data.productsByUser);
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <SectionWrapper>
      <h3 className="title">My Plant Posts</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>PRICE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {plantPosts?.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{new Date(+p.createdAt).toDateString()}</td>
                <td>{p.stockQuantity > 0 ? "Posted" : "Sold"}</td>
                <td>${p.price}</td>
                <td>
                  <Link to={p.link}>View</Link>
                  <Link to={p.deleteLink}>Delete</Link>
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
    color: var(--green-medium);
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
      margin: 0 5px;
    }
  }
`;
