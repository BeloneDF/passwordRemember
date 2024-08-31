import { login } from "@/actions/login";
import InputText from "@/components/inputText/inputText";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="w-[60%] h-[80%] flex p-0 bg-zinc-900 text-white/90">
        <div className="w-[50%] h-[100%] p-4 flex flex-col border-none bg-zinc-800 rounded-tl-lg rounded-bl-lg">
          <div className="flex flex-1 flex-col gap-4">
            <header className="text-zinc-400 h-10 flex items-center">
              <div className="flex gap-2 items-center p-2">
                <Shield size={32} />
                <span className="text-md">Wellcome to Password Remember!</span>
              </div>
            </header>
            <main className="h-[80%] flex items-center justify-center">
              <img
                src="logo.png"
                alt=""
                className="w-[100%] object-cover drop-shadow-[5px_5px_5px_#00000073]"
              />
            </main>
            <footer className=" h-10 flex items-end justify-center">
              <div className="text-sm text-zinc-400 flex justify-center ">
                <span>
                  All rights reserved &copy;2024 Belone Zorzetto Fraga
                </span>
              </div>
            </footer>
          </div>
        </div>
        <main className="w-[50%] h-[100%] border-none bg-zinc-950 rounded-tr-lg rounded-br-lg">
          <div className="p-4 flex items-center justify-end">
            <button className="w-16 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-md text-sm">
              Login
            </button>
          </div>
          <div className="items-center w-[100%] h-[90%] flex justify-center">
            <div className="w-[70%]">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[80%]">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your data below to create your account
                  </p>
                </div>

                <div className="grid gap-1">
                  <form action="" className="grid gap-2">
                    <div className="grid gap-1">
                      <label className="text-sm">Email</label>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                      ></input>
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm">Username</label>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        id="username"
                        placeholder="Exemple: John Doe"
                        type="username"
                      ></input>
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm">Password</label>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        id="password"
                        placeholder="Your password"
                        type="password"
                      ></input>
                    </div>
                  </form>
                </div>
                <button className="bg-white rounded-md h-9 text-zinc-950 ">
                  Sign In
                </button>
              </div>
              <p className="px-8 text-center text-sm text-muted-foreground mt-4">
                By clicking continue, you agree to our <br />
                <a className="text-white underline">
                  Terms of Service
                </a> and <a className="text-white underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* <form
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
      </p> */}
    </>
  );
}
