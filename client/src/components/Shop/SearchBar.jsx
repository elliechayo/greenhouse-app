import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  Select,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";

// icons
import { PiMagnifyingGlass } from "react-icons/pi";

// assets
import BackgroundImage from "../../assets/searchbackground.png";

export default function SearchBar({
  setSelectedCategory,
  setProducts,
  productsCopy,
  search,
}) {
  const categories = [
    {
      id: 0,
      label: "None",
      value: "All Products",
    },
    {
      id: 1,
      label: "Category 1",
      value: "category-1",
    },
    {
      id: 2,
      label: "Category 2",
      value: "category-2",
    },
    {
      id: 3,
      label: "Category 3",
      value: "category-3",
    },
    {
      id: 4,
      label: "Category 4",
      value: "category-4",
    },
  ];

  const changeCategory = (event) => {
    const val = event.target.value;
    if (val === "All Products") {
      setProducts(productsCopy);
      return;
    }
    setSelectedCategory(val);
    setProducts(productsCopy?.filter((e) => e.category === val));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("searchTerm");
    if (!searchTerm) {
      setProducts(productsCopy);
      return;
    }
    setProducts(
      productsCopy?.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <SearchBarWrapper as="section" imagepath={BackgroundImage}>
      <form onSubmit={handleFormSubmit}>
        <FormControlWrapper>
          <InputGroup className="input-group">
            <InputLeftAddon className="left">
              <Select onChange={changeCategory}>
                {categories.map((c) => {
                  return (
                    <option key={c.id} value={c.value}>
                      {c.label}
                    </option>
                  );
                })}
              </Select>
              <p className="divider-p">|</p>
            </InputLeftAddon>
            <Input
              type="search"
              placeholder="Enter your search query..."
              name="searchTerm"
            />
            <InputRightAddon className="right">
              <button type="submit">
                <PiMagnifyingGlass fontSize={22} />
              </button>
            </InputRightAddon>
          </InputGroup>
        </FormControlWrapper>
      </form>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled(Box)`
  min-height: 250px;
  padding-top: 40px;
  background: url(${(props) => props.imagepath});
  background-size: cover;
  background-position: center;
  max-width: 1200px;
  margin: 0 auto;

  & form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FormControlWrapper = styled(FormControl)`
  & .input-group {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    background: white;
    gap: 0;
  }

  & .left,
  & .right {
    background: white;
    border: none;
  }

  & .divider-p {
    color: lightgray;
  }

  & input,
  & select,
  & button {
    background: white;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    font-weight: 400;
  }

  &input:focus-visible {
    outline: none;
  }
`;
