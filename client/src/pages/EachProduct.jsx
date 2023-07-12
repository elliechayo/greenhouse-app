import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  GET_SINGLE_PRODUCT,
} from "../graphql/queries";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import {
  Box,
  Card,
  Stack,
  CardBody,
  Text,
  Heading,
  CardFooter,
  Image,
  FormControl,
  InputGroup,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { backend_URL } from "../config";
import UserContext from "../context/user/userContext";

// icons
import { PiPencilSimpleLineThin, PiHeartBold } from "react-icons/pi";
import { MdOutlineModeComment } from "react-icons/md";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoGoogle,
  BiLogoPinterestAlt,
} from "react-icons/bi";

// components
import SearchBar from "../components/Shop/SearchBar";
import SectionTitle from "../components/shared/SectionTitle";

export default function EachProduct() {
  const { user } = useContext(UserContext);
  const [view, setView] = useState("details");
  const [showPanel, setShowPanel] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id },
  });
  const [product, setProduct] = useState(null);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [addToWishList] = useMutation(ADD_TO_WISHLIST);

  const changeView = (v) => {
    setView(v);
  };

  const toggleReviewPanel = () => {
    setShowPanel(!showPanel);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addToCart({
        variables: {
          productId: id,
          userId: user.id,
          quantity,
        },
      });
      if (data?.addToCart) {
        toast.success("Added to Cart");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.toString() === "Product already exists") {
        toast.error(error.message);
      }
    }
  };

  const handleAddToWishList = async () => {
    try {
      const { data } = await addToWishList({
        variables: {
          productId: id,
          userId: user.id,
        },
      });
      if (data?.addToWishList) {
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.toString() === "Product already exists") {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return <>loading...</>;
  }
  if (error) {
    toast.error(error.message);
  }

  if (data && product === null) {
    setProduct(data.product);
  }

  return (
    product && (
      <main>
        <SearchBar />

        <ProductWrapper as="section">
          <SectionTitle title={"Product Name"} />
          <Card
            direction={{ base: "column", md: "row" }}
            overflow="hidden"
            variant="outline"
            maxW="lg"
            className="product-card"
          >
            <Image
              objectFit="contain"
              src={`${backend_URL}/uploads/${product.image}`}
              alt={product.name}
              className="card-image"
            />

            <Stack className="card-text">
              <CardBody>
                <Heading size="md" as="h3">
                  {product.name}
                </Heading>
                <div className="rating">
                  <p className="rating">{"⭐".repeat(product.rating || 1)}</p>
                  <button
                    onClick={() => {
                      changeView("reviews");
                      setShowPanel(true);
                    }}
                  >
                    <MdOutlineModeComment />
                    Read reviews(4)
                  </button>
                  <button
                    onClick={() => {
                      changeView("reviews");
                      setShowPanel(true);
                    }}
                  >
                    <PiPencilSimpleLineThin />
                    Write a review
                  </button>
                </div>
                <h2 className="price">${product.price}</h2>

                <Text py="2" as="p" className="description">
                  {product.description}
                </Text>

                <form onSubmit={handleAddToCart}>
                  <FormControl className="form-control">
                    <InputGroup className="input-group">
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </InputGroup>
                    <button type="submit">Add To Cart</button>
                  </FormControl>
                </form>
              </CardBody>

              <CardFooter className="card-footer">
                <button className="wishlist-btn" onClick={handleAddToWishList}>
                  {" "}
                  <PiHeartBold /> Add to wishlist
                </button>
                <div className="share-links">
                  <Link to="/" className="facebook">
                    <BiLogoFacebook />
                    Share
                  </Link>
                  <Link to="/" className="tweet">
                    <BiLogoTwitter />
                    tweet
                  </Link>
                  <Link to="/" className="google">
                    <BiLogoGoogle />
                    Google+
                  </Link>
                  <Link to="/" className="pinterest">
                    <BiLogoPinterestAlt />
                    pinterest
                  </Link>
                </div>
                <Link to="/" className="card-guide">
                  Care Guide
                </Link>
              </CardFooter>
            </Stack>
          </Card>
          <Stack className="product-info">
            <Box as="div" className="info-heading">
              <h3
                className={view === "details" ? "active" : ""}
                onClick={() => changeView("details")}
              >
                Product Details
              </h3>
              <h3
                className={view === "reviews" ? "active" : ""}
                onClick={() => changeView("reviews")}
              >
                Reviews
              </h3>
            </Box>
            {view === "reviews" ? (
              <Box as="div" className="review">
                <p className="grade">
                  <strong>Grade</strong> {"⭐".repeat(5)}
                </p>
                <ul>
                  <li>
                    <h4>postthemes</h4>
                    <p>03/10/2019</p>
                  </li>
                  <li>
                    <h4>Palaza</h4>
                    <p>themes</p>
                  </li>
                </ul>
                <button
                  className="write-review-btn"
                  onClick={toggleReviewPanel}
                >
                  Write Your Review!
                </button>
                {showPanel && <WriteReviewForm />}
              </Box>
            ) : (
              <Box as="div" className="details">
                <p>{product.longDescription}</p>
              </Box>
            )}
          </Stack>
        </ProductWrapper>
      </main>
    )
  );
}

function WriteReviewForm() {
  return (
    <ReviewFormWrapper>
      <form>
        <div className="form-control">
          <label>Rating:</label>
          <div>{"⭐".repeat(5)}</div>
        </div>
        <div className="form-control">
          <label>Comment</label>
          <textarea cols="30" rows="10"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </ReviewFormWrapper>
  );
}

const ReviewFormWrapper = styled.section`
  max-width: 600px;
  margin: 20px auto;
  box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 10px;

  form {
    max-width: 100%;

    .form-control {
      display: flex;
      gap: 10px;
      flex-direction: column;
      align-items: flex-start;
      margin: 10px 0;
    }

    textarea {
      border: 1px solid lightgray;
      width: 100%;
    }

    button[type="submit"] {
      width: 100%;
    }
  }
`;

const ProductWrapper = styled(Box)`
  margin-top: 60px;

  .rating {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 5px;

    button {
      display: flex;
      align-items: center;
      color: gray;
      gap: 2px;
    }
  }

  .product-card {
    max-width: 800px;
    margin: 40px auto;
    background: #f3f3f3;
  }

  .price {
    font-size: 24px;
    margin: 10px 0;
    color: var(--green-light);
    font-weight: bold;
  }

  .description {
    font-size: 14px;
    color: gray;
  }

  .card-image {
    margin: 5px;
  }

  .card-text {
    background: white;
    flex: 1;
  }

  form {
    margin-top: 20px;
    max-width: 300px;

    .form-control {
      display: flex;
      align-items: flex-end;
      gap: 5px;
    }

    label {
      font-size: 14px;
    }

    .input-group {
      max-width: 100px;
      font-size: 14px;
      color: gray;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    button {
      flex: 1;
      padding: 10px;
      border-radius: 999px;
      background: var(--green-medium);
      color: white;
    }
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;

    .wishlist-btn {
      font-size: 14px;
      display: flex;
      gap: 2px;
      align-items: center;
      &:hover {
        color: var(--green-medium);
      }
    }

    .share-links {
      margin: 20px 0 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;

      a {
        max-width: 90px;
        padding: 2px 5px;
        display: block;
        color: white;
        border-radius: 2px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
        font-size: 12px;

        &.facebook {
          background: #415896;
        }
        &.tweet {
          background: #4ba7e9;
        }
        &.google {
          background: #cf553e;
        }
        &.pinterest {
          background: #bd342c;
        }
      }
    }

    .card-guide {
      color: var(--green-medium);
      font-size: 18px;
      margin-top: 20px;
      text-decoration: underline;
    }
  }

  .product-info {
    max-width: 400px;
    margin: 40px auto;
  }

  .review {
    text-align: center;
  }

  .review {
    ul li {
      margin: 10px 0;
    }

    ul li p {
      color: gray;
    }

    ul li h4 {
      font-weight: bolder;
    }

    .write-review-btn {
      padding: 10px 16px;
      background: #333333;
      color: white;
      margin-top: 10px;
      display: inline-block;
    }
  }

  .details p {
    color: gray;
    font-size: 18px;
    text-align: justify;
  }

  .info-heading {
    font-size: 22px;
    display: flex;
    color: gray;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin: 30px 0 20px;
    cursor: pointer;
  }

  .info-heading h3.active {
    color: var(--green-medium);
    text-decoration: underline;
  }
`;
