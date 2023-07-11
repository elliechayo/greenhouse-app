import { useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Checkbox,
  FormControl,
  FormLabel,
  InputRightAddon,
  InputGroup,
  FormHelperText,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_USER } from "../graphql/queries";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signUpUser, { loading, error }] = useMutation(SIGN_UP_USER);

  const initialFormFields = {
    socialTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  if (loading) return <div></div>;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function submitHandler(e) {
    e.preventDefault();

    let signedUpUser;

    try {
      signedUpUser = await signUpUser({
        variables: formFields,
      });
    } catch (error) {
      console.log(error);
      return;
    }

    if (signedUpUser?.data?.signupUser?.email) {
      toast.success("Successfully registered. Now login to continue");
      navigate("/login");
    } else {
      toast.error("Something Went Wrong");
    }
  }

  return (
    <Main>
      <h2 className="title">Create an account</h2>
      <RegisterFormWrapper onSubmit={submitHandler} as="section">
        {error && (
          <FormErrorWrapper className="form-error">
            <p>{error.message || "Authentication Failed"}</p>
          </FormErrorWrapper>
        )}
        <p>
          Alread have an account with us? <Link to="/login">Login instead</Link>
        </p>
        <form>
          <FormControlWrapper>
            <FormLabel>Social Title</FormLabel>
            <RadioGroup>
              <Stack direction="row">
                <Radio
                  value="Mr"
                  name="socialTitle"
                  onChange={handleInputChange}
                >
                  Mr.
                </Radio>
                <Radio
                  value="Mrs"
                  name="socialTitle"
                  onChange={handleInputChange}
                >
                  Mrs.
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControlWrapper>

          <FormControlWrapper>
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="firstName" onChange={handleInputChange} />
          </FormControlWrapper>

          <FormControlWrapper>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastName" onChange={handleInputChange} />
          </FormControlWrapper>

          <FormControlWrapper>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" onChange={handleInputChange} />
          </FormControlWrapper>

          <FormControlWrapper>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
              />
              <InputRightAddon onClick={togglePassword}>Show</InputRightAddon>
            </InputGroup>
          </FormControlWrapper>

          <FormControlWrapper>
            <FormLabel>Date Of Birth</FormLabel>
            <Input
              type="date"
              name="dateOfBirth"
              onChange={handleInputChange}
            />
            <FormHelperText>Optional</FormHelperText>
          </FormControlWrapper>

          <FormControlWrapper className="checkboxWrapper">
            <FormLabel></FormLabel>
            <Checkbox className="checkbox">
              Receive offers from partners
            </Checkbox>
          </FormControlWrapper>

          <FormControlWrapper className="checkboxWrapper">
            <FormLabel></FormLabel>
            <Checkbox className="checkbox">
              Sign up for our newsletter. <br /> You may unsubscribe any moment.
              For that purpose, please find our contact info in the legal
              notice.
            </Checkbox>
          </FormControlWrapper>

          <button type="submit">Register</button>
        </form>
      </RegisterFormWrapper>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1200px;
  margin: 50px auto 0;

  & .title {
    font-size: 22px;
    font-weight: bolder;
  }
`;

const RegisterFormWrapper = styled(Box)`
  box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-top: 30px;
  border-radius: 5px;

  & p a {
    color: var(--green-medium);
  }

  & form {
    margin-top: 30px;
    display: flex;
    gap: 30px;
    flex-direction: column;

    & button[type="submit"] {
      padding: 12px 18px;
      background: #333;
      color: white;
      border-radius: 5px;
      align-self: flex-end;
      margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 10px;

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

  &.checkboxWrapper label.checkbox {
    text-align: left;
    max-width: 300px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;

    & label {
      text-align: left;
      max-width: 100%;
    }

    &.checkboxWrapper label.checkbox {
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
