import { useContext, useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/queries";
import { toast } from "react-toastify";
import UserContext from "../context/user/userContext";

export default function Login() {
  const navigate = useNavigate();
  // context
  const { dispatch } = useContext(UserContext);

  const initialFormFields = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginUser({
        variables: formFields,
      });
      if (newUser?.data?.loginUser?.token) {
        const { token, user: userFromDB } = newUser.data.loginUser;
        // set the token in local storage for persistence
        localStorage.setItem("greenhouseUserToken", token);
        // set the user in state
        dispatch({
          type: "SET_USER",
          payload: { user: userFromDB },
        });

        navigate("/");
        toast.success("You are logged in");
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <Main>
      <h2 className="title">Log in to your account</h2>
      <LoginFormWrapper as="section">
        <form onSubmit={handleFormSubmit}>
          {error && (
            <FormErrorWrapper className="form-error">
              <p>{error.message || "Authentication Failed"}</p>
            </FormErrorWrapper>
          )}
          <FormControlWrapper>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formFields.email}
              onChange={handleInputChange}
            />
          </FormControlWrapper>

          <FormControlWrapper>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formFields.password}
                onChange={handleInputChange}
              />
              <InputRightAddon onClick={togglePassword}>Show</InputRightAddon>
            </InputGroup>
          </FormControlWrapper>
          <Link to="/forgotPassword">Forgot your password?</Link>
          <button type="submit">Sign In</button>
        </form>
        <p className="register-redirect">
          No account? <Link to="/register">Create one here</Link>
        </p>
      </LoginFormWrapper>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1200px;
  margin: 60px auto;

  & .title {
    font-size: 22px;
    font-weight: bolder;
  }
`;

const LoginFormWrapper = styled(Box)`
  margin-top: 20px;
  box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;

  & form {
    margin: 0 auto;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    & a {
      text-align: center;
      display: block;
      color: var(--green-medium);
     
      &:hover {
        color: darkgreen;
      }
    }

    & button[type="submit"] {
      padding: 10px 18px;
      border-radius: 5px;
      background: var(--green-medium);
      color: white;
      border: none;
      outline: none;

      &:hover {
        background: darkgreen;
      


    }
  }

  & .register-redirect {
    text-align: center;
    margin-top: 30px;

    & a {
      color: var(--green-medium);
      &:hover {
        color: darkgreen;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const FormControlWrapper = styled(FormControl)`
  display: flex;
  align-items: center;

  & label {
    max-width: 150px;
    text-align: right;
    width: 100%;
  }

  & input {
    border-radius: 5px;
    background: #eee;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;

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
