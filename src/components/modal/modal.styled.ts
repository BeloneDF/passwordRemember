import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.35); /* Altere a opacidade aqui */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 5px 10px 28px 0px rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  border-radius: 10px;
  width: 35%;
  height: 70%;
  background-color: white;
  padding: 0px 20px 0 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  overflow-y: auto;
`;

export const ButtonDiv = styled.div`
  height: 5%;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row-reverse;
`;

export const Button = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: gray;
  outline: none;
  border: none;

  &:hover {
    color: red;
    border: none;
    outline: none;
  }
`;
