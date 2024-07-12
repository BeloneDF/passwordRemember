import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerComponent = styled.div`
  margin: 100px auto;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #1b2d51;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;
