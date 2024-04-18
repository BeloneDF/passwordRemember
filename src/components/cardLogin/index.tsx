import { Card } from "react-bootstrap";
import * as S from "./cardLogin.styeled";

interface Card {
  title: React.ReactNode;
  children: React.ReactNode;
}
function CardLogin({ title, children }: Card) {
  return (
    <>
      <Card
        bg="light"
        key="light"
        text="dark"
        style={{ width: "20%", height: "40%" }}
        className="mb-2"
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{title}</Card.Title>
          <S.Container>{children}</S.Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardLogin;
