import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Failure() {
  const navigate = useNavigate();
  toast.error("Payment failed");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate("/account?view=cart");
    }, 5000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [navigate]);

  return (
    <FailureWrapper>
      <h1>Payment Failed!</h1>
      <p>This page will redirect in few seconds</p>
    </FailureWrapper>
  );
}

const FailureWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px;
  text-align: center;

  h1 {
    font-size: clamp(32px, 5vw, 54px);
    margin: 40px 0;
  }
`;
