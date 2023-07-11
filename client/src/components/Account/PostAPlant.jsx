import styled from "@emotion/styled";
import { ADD_PRODUCT } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { user } from "../../fakeData";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function PostAPlant() {
  const navigate = useNavigate()
  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT);

  const initialFormFields = {
    name: "",
    category: "",
    price: "",
    image: "red",
    description: "",
    longDescription: "",
  };

  const [formFields, setFormFields] = useState(initialFormFields);


  if (loading) return <div></div>;

  async function submitHandler(e) {
    e.preventDefault();
    let addedProduct

    
    console.log(formFields)
    try {
      addedProduct = await addProduct({
        variables: {
          name: formFields.name,
          category: formFields.category,
          price: formFields.price,
          image: "static",
          description: formFields.description,
          longDescription: formFields.longDescription,
          userId: user.id
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }

    if (addedProduct?.data?.addProduct) {
      toast.success("Successfully added product.");
      navigate("/");
    } else {
      toast.error("Something Went Wrong");
    }
  }

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <SectionWrapper>
      <form onSubmit={submitHandler}>
      {error && (
          <FormErrorWrapper className="form-error">
            <p>{error.message || "Authentication Failed"}</p>
          </FormErrorWrapper>
        )}
        <div className="form-group">
          <label>Plant Name</label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="text" name="price" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file"  />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea id="" cols="30" rows="3" name="description" onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label>Product Details</label>
          <textarea id="" cols="30" rows="3" name="longDescription" onChange={handleInputChange}></textarea>
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
