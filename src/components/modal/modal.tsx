import { ReactNode } from 'react';
import * as S from './modal.styled';

interface ModaLProps {
  children: ReactNode;
  open: boolean;
  toggleModal: () => void;
}

function Modal({ children, open, toggleModal }: ModaLProps) {
  return (
    <>
      {open === true ? (
        <S.Container>
          <S.Content>
            <S.ButtonDiv>
              <S.Button onClick={() => toggleModal()}> X </S.Button>
            </S.ButtonDiv>
            {children}
          </S.Content>
        </S.Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default Modal;
