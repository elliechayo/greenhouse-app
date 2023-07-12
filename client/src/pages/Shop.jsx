import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../graphql/queries";
import { toast } from "react-toastify";

// components
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

// components
import ProductsList from "../components/shared/ProductsList";
import SearchBar from "../components/Shop/SearchBar";
import SectionTitle from "../components/shared/SectionTitle";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("category-1");
  const [products, setProducts] = useState(null);
  const [productsCopy, setProductsCopy] = useState(null);
  const { data: productsData, loading, error } = useQuery(GET_ALL_PRODUCTS);
  if (loading) <>Loading...</>;
  if (error) toast.error(error);
  if (productsData?.products && products === null) {
    setProducts(productsData.products);
    setProductsCopy(productsData.products);
  }

  return (
    <main>
      <SearchBar
        setSelectedCategory={setSelectedCategory}
        productsCopy={productsCopy}
        setProducts={setProducts}
      />
      <ProductsWrapper as="section">
        <SectionTitle title={selectedCategory} />
        {products && (
          <ProductsList
            products={products}
            productsCount={12}
            setProducts={setProducts}
          />
        )}
      </ProductsWrapper>
    </main>
  );
}

const ProductsWrapper = styled(Box)`
  margin-top: 40px;

  .products-list {
    margin: 60px 0;
  }
`;
