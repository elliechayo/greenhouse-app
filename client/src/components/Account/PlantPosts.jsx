import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { GET_PRODUCTS_BY_USER, REMOVE_PRODUCT } from "../../graphql/queries";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PlantPosts({ user }) {
  const [plantPosts, setPlantPosts] = useState(null);
  const [removeProduct] = useMutation(REMOVE_PRODUCT);
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

  const handleDelete = async (id) => {
    try {
      const { data } = await removeProduct({
        variables: {
          productId: id,
        },
      });

      if (data?.removeProduct?.id) {
        setPlantPosts(plantPosts.filter((e) => e.id !== data.removeProduct.id));
        toast.success("Post deleted");
      } else {
        toast.error("Error while deleting post");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error while deleting post");
    }
  };

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
                <td className="btn-group">
                  <Link to={`/products/${p.id}`}>View</Link>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
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

    .btn-group {
      display: flex;
    }

    & a,
    & button {
      color: white;
      background: var(--green-medium);
      padding: 12px;
      margin: 0 5px;
      border: none;

      &:hover {
        background: var(--dark-bg);
      }
    }
  }
`;
