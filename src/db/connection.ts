import postgres from "postgres";
import { env } from "../env";

const url = postgres(env.DATABASE_URL);

async function connectToDatabase(): Promise<void> {
  try {
    console.log("Conexão bem sucedida");
  } catch (error) {
    console.error("Erro ao conectar-se ao banco de dados: ", error);
  } finally {
    await url.end();
  }
}

export default connectToDatabase();
