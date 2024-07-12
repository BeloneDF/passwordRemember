import styled from "styled-components";

export const TextInput = styled.input`
  transition: all 0.2s ease-in-out;
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #fff;
  border: 1px solid #555;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #1b2d51;
  font-weight: 600;
  font-size: 1rem;

  padding-left: 5px;

  &:active {
    background-color: #e5e5e5;
    box-shadow: inset 0px 0px 10px gray;
    border: none;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #a1a1a1;
    border: none;
  }
`;

export const SelectInput = styled.select`
  transition: all 0.2s ease-in-out;
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  align-items: center;
  display: flex;
  justify-content: center;
  text-transform: capitalize;
  color: #1b2d51;
  font-weight: 600;
  font-size: 1rem;
  padding-left: 5px;

  &:active {
    background-color: #e5e5e5;
    box-shadow: inset 0px 0px 10px gray;
    border: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    white-space: nowrap; /* Impede que o texto seja quebrado em várias linhas */
    overflow: hidden; /* Esconde o conteúdo além da largura especificada */
    text-overflow: ellipsis;
    text-align: left;
  }
`;

export const ContainerTextArea = styled.div`
  width: 30%;
  display: flex;
  /* justify-content: center; */
  padding: 10px;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    white-space: nowrap; /* Impede que o texto seja quebrado em várias linhas */
    overflow: hidden; /* Esconde o conteúdo além da largura especificada */
    text-overflow: ellipsis;
  }
`;
