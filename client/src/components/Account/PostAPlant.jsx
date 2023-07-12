import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react";
import { ADD_PRODUCT } from "../../graphql/queries";
import { backend_URL } from "../../config";
import { toast } from "react-toastify";
import { Select } from "@chakra-ui/react";

export default function PostAPlant({ user }) {
  const initialFormFields = {
    name: "",
    category: "category-1",
    price: "",
    image: "",
    description: "",
    longDescription: "",
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      // upload the image
      const res = await fetch(backend_URL + "/addMedia", {
        method: "POST",
        body: formData,
      });
      const uploadResponse = await res.json();
      if (uploadResponse.success === false) {
        toast.error("Error while adding product");
        return;
      }

      // if image is uploaded, fill the image url field and add the product to the db
      const { data } = await addProduct({
        variables: {
          ...formFields,
          image: uploadResponse.file,
          createdBy: user.id,
        },
      });
      if (data?.addProduct?.id) {
        toast.success("Added successfully!");
        setFormFields(initialFormFields);
        event.target.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro while adding product");
      return;
    }
  };

  return (
    <SectionWrapper>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        {error && (
          <FormErrorWrapper className="form-error">
            <p>{error.message || "Authentication Failed"}</p>
          </FormErrorWrapper>
        )}
        <div className="form-group">
          <label>Plant Name</label>
          <input
            type="text"
            name="name"
            value={formFields.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <Select
            name="category"
            value={formFields.category}
            onChange={handleInputChange}
          >
            <option value="category-1">Category 1</option>
            <option value="category-2">Category 2</option>
            <option value="category-3">Category 3</option>
            <option value="category-4">Category 4</option>
          </Select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formFields.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="uploadedFile" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            id=""
            cols="30"
            rows="3"
            name="description"
            value={formFields.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Product Details</label>
          <textarea
            id=""
            cols="30"
            rows="3"
            name="longDescription"
            value={formFields.longDescription}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  form {
    box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    gap: 10px;

    .form-group {
      display: flex;

      label {
        max-width: 100px;
        width: 100%;
        color: gray;
      }

      input,
      textarea {
        padding: 7px;
        width: 100%;
        background: var(--light-bg);
        border: 1px solid lightgray;
      }
    }

    button[type="submit"] {
      padding: 12px;
      background: var(--green-medium);
      color: white;
      align-self: flex-end;
      margin-top: 20px;
      border-radius: 2px;
      max-width: 150px;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .form-group {
      flex-direction: column;
    }
  }
`;

const FormErrorWrapper = styled.div`
  & p {
    color: #881c24;
  }

  text-align: center;
  background: #f8d7da;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  align-self: stretch;
`;
