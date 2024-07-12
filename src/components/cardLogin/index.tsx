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
        bg="white"
        key="light"
        text="dark"
        style={{ width: "30%", height: "60%", border: "none" }}
        className="mb-2"
      >
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            height: "100%",
          }}
        >
          <Card.Title style={{ textAlign: "center" }}>{title}</Card.Title>
          <S.Container>{children}</S.Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardLogin;
