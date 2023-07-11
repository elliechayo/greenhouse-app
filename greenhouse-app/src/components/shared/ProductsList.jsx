import styled from "@emotion/styled";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

// components
import ProductCard from "./ProductCard";

export default function ProductsList({ productsCount, products }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const changePage = (i, e) => {
    setCurrentIdx(productsCount * i);
    const children = [...e.target.parentElement.children];
    children.forEach((c) => c.classList.remove("active"));
    e.target.classList.add("active");
  };

  return (
    <div className="products-list">
      <FilterWrapper>
        <Select placeholder="Sort By" maxW="200px">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
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
            return <ProductCard key={product.id} product={product} />;
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
