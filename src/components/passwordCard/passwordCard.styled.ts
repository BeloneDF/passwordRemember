import styled from "styled-components";
import { FaRegCopy } from "react-icons/fa6";

export const Container = styled.section`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 10px;
  color: gray;
  padding: 10px;
  height: 150px;
  border: 1px solid #f0f0f0;
`;
export const ContentMaster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

export const Image = styled.img`
  height: 100%;
  width: 30%;
  border-radius: 10px;
  object-fit: contain;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
`;

export const OtherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Name = styled.div`
  color: black;
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const PasswordContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  height: 20%;
`;

export const ButtonCopyPassword = styled(FaRegCopy)`
  width: 15px;
  height: 15px;
  color: gray;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

interface AProps {
  backgroundColor: string;
}

// Usando a interface para tipar as props
export const CircleSecondVerification = styled.div<AProps>((props) => ({
  backgroundColor: props.backgroundColor,
  width: "15px",
  height: "15px",
  borderRadius: "50%",
}));

// export const CircleSecondVerification = styled.div<{
//   $backgroundColor: string;
// }>`
//   width: 15px;
//   height: 15px;
//   border-radius: 50%;
//   background-color: props.backgroundColor;
// `;

export const ImageSecondVerification = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export const SecondVerification = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LoginDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  max-width: 250px;
`;

export const Login = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 85%;
`;

export const Excluir = styled.div`
  color: #a50f34;
  cursor: pointer;

  :hover {
    color: black;
  }
`;

export const deleteButton = styled.button`
  color: #a50f34;
  cursor: pointer;
  background-color: transparent;
  border: none;

  :hover {
    color: black;
    outline: none;
  }
`;
