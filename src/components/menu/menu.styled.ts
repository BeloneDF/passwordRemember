import styled from "styled-components";

export const ButtonContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  height: 10%;
  gap: 10px;
`;

export const Content = styled.section`
  height: 55%;
`;

export const SaveButton = styled.button`
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background-color: green;
  color: #fff;
  cursor: pointer;
  width: 80%;
  transition: 0.3s;
  animation: name duration timing-function delay iteration-count direction
    fill-mode;

  &:hover {
    background-color: darkgreen;
    color: white;
  }
`;

export const EditButton = styled.button`
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
  width: 20%;
  transition: 0.3s;
  animation: name duration timing-function delay iteration-count direction
    fill-mode;

  &:hover {
    background-color: darkgray;
    color: white;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10%;
  gap: 10px;
  color: #ccc;
  font-size: 12px;
`;

export const ExitButton = styled.button`
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
  width: 100%;
  height: 40px;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: name duration timing-function delay iteration-count direction
    fill-mode;

  &:hover {
    background-color: darkgray;
    border: 2px solid darkgray;
    color: white;
  }
`;
