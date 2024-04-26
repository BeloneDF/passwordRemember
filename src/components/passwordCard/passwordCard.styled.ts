import styled from 'styled-components';

export const Container = styled.section`
  width: 30%;
  height: 20%;
  background-color: white;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: gray;
  padding: 10px;
`;
export const ContentMaster = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.img`
  height: 100%;
  width: 25%;
  border-radius: 10px;
  object-fit: contain;
`;

export const InfoContainer = styled.div`
  height: 100%;
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const OtherContainer = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Name = styled.p`
  color: black;
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 500;
`;
export const PasswordContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  text-align: center;
  height: 25%;
`;

export const ButtonCopyPassword = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  color: gray;
  align-items: center;
  display: flex;
  justify-content: center;
  border: none;

  &:hover {
    border: none;
    color: black;
  }
`;
interface CircleSecondVerificationProps {
  backgroundColor: string;
}

export const CircleSecondVerification = styled.div<CircleSecondVerificationProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor};
`;

export const ImageSecondVerification = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;

export const SecondVerification = styled.div`
  width: 100%;
  heigth: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
