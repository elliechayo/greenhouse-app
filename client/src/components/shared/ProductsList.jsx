import styled from "@emotion/styled";
import { Select } from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserContext from "../../context/user/userContext";

// components
import ProductCard from "./ProductCard";

export default function ProductsList({ productsCount, products, setProducts }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { user } = useContext(UserContext);

  const changePage = (i, e) => {
    setCurrentIdx(productsCount * i);
    const children = [...e.target.parentElement.children];
    children.forEach((c) => c.classList.remove("active"));
    e.target.classList.add("active");
  };

  const handleSort = (e) => {
    const val = e.target.value;
    if (!val) {
      return;
    }
    let newProducts = [...products];

    if (val === "low-to-high") {
      newProducts = newProducts.sort((a, b) =>
        Number(a.price) > Number(b.price) ? 1 : -1
      );
    } else if (val === "high-to-low") {
      newProducts = newProducts.sort((a, b) =>
        Number(b.price) > Number(a.price) ? 1 : -1
      );
    } else if (val === "best-seller") {
      newProducts = newProducts.sort((a, b) => (b.rating > a.rating ? 1 : -1));
    }
    setProducts(newProducts);
  };

  return (
    <div className="products-list">
      <FilterWrapper>
        <Select placeholder="Sort By" maxW="200px" onChange={handleSort}>
          <option value="best-seller">Best Seller</option>
          <option value="low-to-high">Price: Low-High</option>
          <option value="high-to-low">Price: High-Low</option>
        </Select>
      </FilterWrapper>
      <ProductsUL>
        {products
          .slice(
            currentIdx,
            productsCount + currentIdx >= products.length
              ? products.length
              : currentIdx + productsCount
          )
          .map((product) => {
            return (
              <ProductCard key={product.id} product={product} user={user} />
            );
          })}
      </ProductsUL>
      <PaginationWrapper>
        {/* Calculate how many pages should be there based on the products length and the products count to show on each page */}
        {new Array(Math.ceil(products.length / productsCount))
          .fill(0)
          .map((_, i) => {
            return (
              <li key={i} onClick={(e) => changePage(i, e)}>
                {i + 1}
              </li>
            );
          })}
      </PaginationWrapper>
    </div>
  );
}

const FilterWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductsUL = styled.ul`
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  & li {
    padding: 7px 12px;
    background: white;
    border: 2px solid lightgray;
    color: lightgray;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
  }

  & li.active {
    border-color: var(--green-light);
    color: var(--green-light);
  }
`;
