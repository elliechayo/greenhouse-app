import { Link, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../graphql/queries";

// assets
import HeroBackground from "../assets/hero.jpeg";
import Category1Image from "../assets/category1.jpg";
import Category2Image from "../assets/category2.jpg";
import Category3Image from "../assets/category3.jpg";
import Category4Image from "../assets/category4.jpg";

import BlogPostImage1 from "../assets/blog1.jpeg";
import BlogPostImage2 from "../assets/blog2.jpeg";
import BlogPostImage3 from "../assets/blog3.jpeg";

import PostPlantImage from "../assets/postaplant.jpeg";

// components
import Category from "../components/Home/Category";
import SectionTitle from "../components/shared/SectionTitle";
import BlogPostCard from "../components/Home/BlogPostCard";
import ProductsList from "../components/shared/ProductsList";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { data: productsData, loading, error } = useQuery(GET_ALL_PRODUCTS);
  const [products, setProducts] = useState(null);
  if (loading) <>Loading...</>;
  if (error) toast.error(error);

  if (products === null && productsData?.products) {
    setProducts(productsData.products);
  }

  const handleSubscribeNow = (event) => {
    event.preventDefault();
    toast.success("Great choice! You're all set to save 20% on you next order");
  };

  const categories = [
    {
      id: 1,
      title: "Category 1",
      link: "/shop",
      subtitle: "Cedar Trees",

      image: Category1Image,
    },
    {
      id: 2,
      title: "Category 2",
      link: "/shop",
      subtitle: "Maple Trees",
      image: Category2Image,
    },
    {
      id: 3,
      title: "Category 3",
      link: "/shop",
      subtitle: "Shrub Trees",
      image: Category3Image,
    },
    {
      id: 4,
      title: "Category 4",
      link: "/shop",
      subtitle: "Fruits Trees",
      image: Category4Image,
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Choosing the Perfect Indoor Plants for Your Home",
      date: "Feb 28, 2023",
      shortDescription:
        "Bringing the beauty of nature indoors is a delightful way to enhance your living space while reaping the numerous benefits that plants offer.",
      link: "/blog",
      image: BlogPostImage1,
    },
    {
      id: 2,
      title: "Enhancing the Health and Beauty of Your Trees",
      date: "July 11, 2023",
      shortDescription:
        "Pruning plays a vital role in maintaining the health, aesthetics, and structural integrity of trees. With proper pruning techniques, you can enhance your trees.",
      link: "/blog",
      image: BlogPostImage2,
    },
    {
      id: 3,
      title: "Creating a Bee-Friendly Garden",
      date: "May 20, 2023",
      shortDescription:
        "Creating a bee-friendly garden is not only a rewarding and beautiful endeavor but also a crucial step towards supporting the vital role that pollinators play in our ecosystem.",
      link: "/blog",
      image: BlogPostImage3,
    },
  ];
  return (
    <main>
      {/* Hero Section */}
      <HeroWrapper as="section" padding="20px">
        <Box maxW="500px">
          <SubTitle>WELCOME TO GREENHOUSE</SubTitle>
          <HeroTitle>Your Online Plant Paradise</HeroTitle>
          <CTAButton onClick={() => navigate("/shop")}>Shop Now &gt;</CTAButton>
        </Box>
      </HeroWrapper>

      {/* Category Section */}
      <CategoryWrapper as="section">
        {categories.map(({ id, title, link, subtitle, image }) => {
          return (
            <Category
              key={id}
              title={title}
              link={link}
              subtitle={subtitle}
              image={image}
            />
          );
        })}
      </CategoryWrapper>

      {/* Products Section */}
      <ProductsWrapper as="section">
        <SectionTitle title="Our Products" />
        {productsData?.products?.length > 0 && (
          <ProductsList
            productsCount={6}
            products={products}
            setProducts={setProducts}
          />
        )}
      </ProductsWrapper>

      {/* Blog Post Section */}
      <BlogPostWrapper as="section">
        <SectionTitle title="From Our Blog" />
        <p className="subtitle">
          Explore a treasure trove of plant care tips, gardening inspiration,
          and captivating articles that will nurture your love for all things
          botanical.
        </p>
        <BlogPostCards>
          {blogPosts.map(
            ({ id, title, shortDescription, date, link, image }) => {
              return (
                <BlogPostCard
                  key={id}
                  title={title}
                  shortDescription={shortDescription}
                  date={date}
                  link={link}
                  image={image}
                />
              );
            }
          )}
        </BlogPostCards>
      </BlogPostWrapper>

      {/* Sell Plants Section */}
      <div
        style={{ background: "linear-gradient(to right, #E2DEDB, #EFEEEA)" }}
      >
        <SellPlantWrapper imagepath={PostPlantImage}>
          <Box as="div">
            <h3>Post a Plant</h3>
            <p>Find your plant the home it deserves</p>
            <Link to="/how-to-post-a-plant">Learn How &gt;</Link>
          </Box>
        </SellPlantWrapper>
      </div>

      {/* Newsletter Section */}
      <SubscribeWrapper>
        <p className="small">Special from greenhouse</p>
        <h3>
          Get <span className="strong">20% Off</span> Your Next Order
        </h3>
        <p className="small">
          Unlock exclusive discounts and stay in the loop with our latest offers
          by subscribing to our newsletter.
        </p>
        <form>
          <input type="email" placeholder="Enter Your Email..." />
          <button type="submit" onClick={handleSubscribeNow}>
            Subscribe Now &gt;
          </button>
        </form>
      </SubscribeWrapper>
    </main>
  );
}

const SubTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3px;
  color: #333333;

  &::after {
    content: "";
    display: block;
    width: 10%;
    height: 10px;
    margin-top: 5px;
    background: var(--green-medium);
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(56px, 5vw, 32px);
  line-height: 110%;
  margin: 20px 0 30px;
`;

const CTAButton = styled.button`
  background: var(--green-medium);
  color: white;
  padding: 12px;
  border-radius: 5px;
  margin-top: 20px;
  font-weight: bold;

  /* Hover styles */
  &:hover {
    background: darkgreen;
`;

const HeroWrapper = styled(Box)`
  background: url(${HeroBackground}) #f1f1f1;
  background-position: bottom;
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 450px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ProductsWrapper = styled(Box)`
  max-width: 1000px;
  margin: 60px auto 0;
`;

const CategoryWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  margin: 60px auto 0;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
`;

const BlogPostWrapper = styled(Box)`
  margin: 60px 0 0;
  padding: 0 5px;

  & > .subtitle {
    text-align: center;
    max-width: 600px;
    margin: 20px auto;
    font-weight: 600;
    color: gray;
    font-size: 14px;
  }
`;

const BlogPostCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const SubscribeWrapper = styled(Box)`
  text-align: center;
  margin-top: 60px;
  padding: 40px 5px;

  & .small {
    color: gray;
    font-size: 14px;
    font-weight: 600;
  }

  & h3 {
    font-size: clamp(32px, 5vw, 42px);
    margin: 10px 0;
    & .strong {
      color: var(--green-medium);
    }
  }

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    gap: 20px;

    & input {
      font-size: 14px;
      font-weight: bolder;
      border-bottom: 1px solid lightgray;
      text-align: center;
      max-width: 400px;
      padding-bottom: 10px;
      width: 100%;
      margin: 0 auto;
      outline: none;
    }

    & button {
      padding: 18px;
      background: var(--green-medium);
      color: white;
      font-weight: bold;
      font-size: 18px;
      border-radius: 5px;
      border: none;
      outline: none;
      
      /* Hover styles */
      &:hover {
        background: var(--dark-bg);
    }
   
  }
`;

const SellPlantWrapper = styled(Box)`
  margin: 60px auto 0;
  background: url(${(props) => props.imagepath}) ;
  background-size: cover;
  background-position: left;
  display: flex;
  justify-content: flex-end;
  max-width: 1000px;
  align-items: center;
  min-height: 500px;
  padding: 50px 5px;
  
  
  @media (max-width: 610px) {
    justify-content: center;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0,0,0,0.8)), url(${(
      props
    ) => props.imagepath}) ;
    background-position: left;
    background-size: cover;
    color: white;
  }

  & h3 {
    font-weight: bold;
    font-size: clamp(38px, 5vw, 48px);
    &::after {
      content: "";
      display: block;
      width: 20%;
      background: var(--green-medium);
      height: 10px;
    }
  }
  & p {
    margin: 20px 0 0px;
  }

  & a {
    padding: 12px;
    background: var(--green-medium);
    color: white;
    font-weight: bolder;
    font-size: 18px;
    display: inline-block;
    border-radius: 5px;
    margin-top: 30px;

    /* Hover styles */
    &:hover {
      background: darkgreen;
  }

  @media (max-width: 768px) {
    background-position: -250px;
  }

`;
