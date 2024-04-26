import { ReactNode } from 'react';
import { Passwords } from '../../types/passwords';
import * as S from './passwordCard.styled';

interface PasswordCardProps {
  pass: Passwords;
  children?: ReactNode;
}

function PasswordCard({ pass }: PasswordCardProps) {
  const maskedPass = pass.password.replace(/./g, '•');
  return (
    <S.Container>
      <S.ContentMaster>
        <S.Image src={pass.image} />
        <S.InfoContainer>
          <S.Name>{pass.name}</S.Name>
          <S.PasswordContainer>
            {maskedPass}
            <S.ButtonCopyPassword> OO</S.ButtonCopyPassword>
          </S.PasswordContainer>
          <S.SecondVerification>
            2FA{' '}
            <S.CircleSecondVerification
              backgroundColor={
                pass.second_verification === true ? 'green' : 'red'
              }
            />
            <S.ImageSecondVerification src={pass.image_verification_software} />
          </S.SecondVerification>
        </S.InfoContainer>
        <S.OtherContainer />
      </S.ContentMaster>
    </S.Container>
  );
}

export default PasswordCard;
