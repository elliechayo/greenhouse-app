import styled from "@emotion/styled";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/queries";
import { toast } from "react-toastify";

export default function PersonalInfo({ user, dispatch, setUser }) {
  const [formFields, setFormFields] = useState(user);
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateUser({
        variables: formFields,
      });
      if (data?.updateUser) {
        dispatch({
          type: "SET_USER",
          payload: { user: data.updateUser },
        });
        setUser(data.updateUser);
        toast.success("Updated!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainWrapper>
      <form onSubmit={handleFormSubmit}>
        {error && (
          <FormErrorWrapper className="form-error">
            <p>{error.message}</p>
          </FormErrorWrapper>
        )}
        <FormControlWrapper>
          <FormLabel>Social Title</FormLabel>
          <RadioGroup value={formFields.socialTitle}>
            <Stack direction="row">
              <Radio value="Mr" onChange={handleInputChange} name="socialTitle">
                Mr.
              </Radio>
              <Radio
                value="Mrs"
                onChange={handleInputChange}
                name="socialTitle"
              >
                Mrs.
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControlWrapper>

        <FormControlWrapper>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={formFields.firstName}
            onChange={handleInputChange}
          />
        </FormControlWrapper>

        <FormControlWrapper>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={formFields.lastName}
            onChange={handleInputChange}
          />
        </FormControlWrapper>

        <FormControlWrapper>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formFields.email}
            onChange={handleInputChange}
          />
        </FormControlWrapper>

        {/* <FormControlWrapper>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type="password" name="password" onChange={handleInputChange}/>
            <InputRightAddon>Show</InputRightAddon>
          </InputGroup>
        </FormControlWrapper> */}

        <FormControlWrapper>
          <FormLabel>Date Of Birth</FormLabel>
          <Input
            type="date"
            name="dateOfBirth"
            value={new Date(formFields.dateOfBirth)
              .toISOString()
              .substring(0, 10)}
            onChange={handleInputChange}
          />
          <FormHelperText>Optional</FormHelperText>
        </FormControlWrapper>

        <FormControlWrapper>
          <FormLabel>Shipping Address</FormLabel>
          <Input
            type="text"
            value={formFields.shippingAddress}
            name="shippingAddress"
            onChange={handleInputChange}
          />
        </FormControlWrapper>

        <FormControlWrapper>
          <FormLabel>Billing Address</FormLabel>
          <Input
            type="text"
            value={formFields.billingAddress}
            name="billingAddress"
            onChange={handleInputChange}
          />
        </FormControlWrapper>

        <button type="submit">Save</button>
      </form>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  form {
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;

    button[type="submit"] {
      padding: 12px 18px;
      background: var(--green-medium);
      color: white;
      border-radius: 5px;
      align-self: flex-end;
      margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
    & form {
      gap: 10px;
    }

    & form button[type="submit"] {
      align-self: center;
    }
  }
`;

const FormControlWrapper = styled(FormControl)`
  display: flex;
  gap: 20px;
  align-items: center;

  & label {
    max-width: 150px;
    width: 100%;
    text-align: right;
  }

  & input {
    background: #eee;
    border-radius: 3px;
    border: 1px solid lightgray;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;

    & label {
      text-align: left;
      max-width: 100%;
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
