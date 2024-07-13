import { useRef, useState } from "react";
import CardLogin from "@components/cardLogin";
import { TextInput } from "@components/input/text-input/input";
import { LargeButtonComponent } from "@components/largeButton/largeButton";
import { selectMethod } from "../../api/methods";
import Loading from "@components/loading/loading";
import { Image } from "react-bootstrap";
import CustomAlert from "@components/alert/alert";

function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await selectMethod("post", "/user", {
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        photo: imageSrc,
      });
      setLoading(false);
      setAlertMessage("correct");
      if (response.status === 200) {
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("error");
      setLoading(false);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imgElement = document.createElement("img");
        imgElement.src = e.target?.result as string;
        imgElement.onload = () => {
          const canvas = document.createElement("canvas");
          const scaleSize = 500 / imgElement.width;
          canvas.width = 500;
          canvas.height = imgElement.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
          const newImgUrl = canvas.toDataURL("image/jpeg", 0.2);
          setImageSrc(newImgUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CardLogin title="Registre-se">
      <TextInput
        type="text"
        placeholder="Username"
        label="Username"
        required
        id="username"
        ref={usernameRef}
      />
      <TextInput
        type="email"
        placeholder="Email"
        label="Email"
        required
        id="email"
        ref={emailRef}
      />
      <TextInput
        type="password"
        placeholder="Password"
        label="Password"
        required
        id="password"
        ref={passwordRef}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: 10,
          gap: 10,
        }}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            roundedCircle
            style={{ width: 50, height: 50 }}
          />
        )}
        <input
          type="file"
          required
          id="photo"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <LargeButtonComponent id="btnenviar" onClick={handleSubmit}>
          Cadastrar
        </LargeButtonComponent>
      )}
      {alertMessage === "" ? null : alertMessage === "correct" ? (
        <CustomAlert
          message={
            "Você criou sua conta com sucesso! acesse o e-mail para validá-la."
          }
          variant="success"
        />
      ) : (
        <CustomAlert message={"Erro ao criar conta!"} variant="danger" />
      )}
    </CardLogin>
  );
}

export default Signup;
