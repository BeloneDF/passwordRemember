import { login } from "@/actions/login";
import InputText from "@/components/inputText/inputText";
export default function Home() {
  return (
    <>
      <form
        action={login}
        className="bg-white w-3/12 h-1/3 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-center font-medium text-lg">
          Login ou Registre-se
        </h1>
        <InputText
          className="mt-4"
          placeholder="Email"
          type="email"
          name="email"
          label="Email"
        />
        <InputText
          placeholder="Password"
          type="password"
          name="password"
          label="Password"
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-56 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Esqueceu a senha?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2024 Belone Zorzetto Fraga. All rights reserved.
      </p>
    </>
  );
}
