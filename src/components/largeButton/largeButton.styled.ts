import styled from "styled-components";

export const LargeButton = styled.button`
  transition: all 0.5s ease;
  background-color: #1b2d51;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  width: 95%;
  height: 40px;
  align-items: center;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #fff;
    color: #1b2d51;
    border: 1px solid #1b2d51;
  }
`;
