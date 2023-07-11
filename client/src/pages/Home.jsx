import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

// import productsData from "../data/products";

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
import { GET_ALL_PRODUCTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <div></div>;
  if (error) {
    toast.error(error.message || "Something went wrong");
  }

  const handleSubscribeNow = (event) => {
    event.preventDefault();
    toast.success("Great choice! You're all set to save 20% on you next order");
  };

  const categories = [
    {
      id: 1,
      title: "Category 1",
      link: "/",
      subtitle: "Big Sale Products",
      image: Category1Image,
    },
    {
      id: 2,
      title: "Category 2",
      link: "/",
      subtitle: "New Arrivals",
      image: Category2Image,
    },
    {
      id: 3,
      title: "Category 3",
      link: "/",
      subtitle: "Top Products",
      image: Category3Image,
    },
    {
      id: 4,
      title: "Category 4",
      link: "/",
      subtitle: "Trending Products",
      image: Category4Image,
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Artist Collaboration With The House 1",
      date: "Feb 28, 2019",
      shortDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      link: "/blog",
      image: BlogPostImage1,
    },
    {
      id: 2,
      title: "Artist Collaboration With The House 2",
      date: "Feb 28, 2019",
      shortDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      link: "/blog",
      image: BlogPostImage2,
    },
    {
      id: 3,
      title: "Artist Collaboration With The House 3",
      date: "Feb 28, 2019",
      shortDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
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
          <CTAButton>Shop Now &gt;</CTAButton>
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
        <ProductsList productsCount={6} products={data.products} />
      </ProductsWrapper>

      {/* Blog Post Section */}
      <BlogPostWrapper as="section">
        <SectionTitle title="From Our Blog" />
        <p className="subtitle">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
          dolores fugiat officiis distinctio impedit harum.
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
            <p>Find you plant the home it deserves</p>
            <Link to="/how-to-post-a-pant">Learn How &gt;</Link>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          minus.
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
`;

const HeroWrapper = styled(Box)`
  background: url(${HeroBackground});
  background-position: bottom;
  background-size: cover;
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
      border-radius: 5px;
      border: none;
      outline: none;
    }
  }
`;

const SellPlantWrapper = styled(Box)`
  margin: 60px auto 0;
  background: url(${(props) => props.imagepath});
  background-size: cover;
  background-position: left;
  display: flex;
  justify-content: flex-end;
  max-width: 1000px;
  align-items: center;
  min-height: 500px;
  padding: 50px 5px;

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
  }

  @media (max-width: 768px) {
    background-position: -250px;
  }
`;
