import styled from "@emotion/styled";
import { Select } from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserContext from "../../context/user/userContext";

// components
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";

export default function ProductsList({ productsCount, products, setProducts }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { user } = useContext(UserContext);

  const changePage = (i) => {
    setCurrentIdx(productsCount * i);
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
        <ReactPaginate
          nextLabel=">>"
          pageCount={Math.ceil(products.length / productsCount)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={0}
          onPageChange={(e) => changePage(e.selected)}
          activeClassName="active"
          breakClassName="break-elem"
          disabledClassName="disabled"
          previousLabel="<<"
        />
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

const PaginationWrapper = styled.div`
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    & li {
      padding: 7px 14px;
      background: white;
      border: 2px solid lightgray;
      color: lightgray;
      border-radius: 2px;
      cursor: pointer;
      font-size: 16px;
    }

    & li.active {
      border-color: var(--green-light);
      color: var(--green-light);
    }

    & li a {
      height: 100%;
      display: block;
      width: 100%;
    }

    & li.disabled {
      border-color: var(--light-bg);
      color: var(--light-bg);
      display: none;
    }

    & li.break-elem {
      display: none;
    }

    & li:first-of-type {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    & li:last-of-type {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`;
