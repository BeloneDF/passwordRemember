"use client";
import { login as LoginAction } from "@/actions/login";
import { Shield } from "lucide-react";
import { useRenderLogin } from "@/hooks/useRenderLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "@/actions/addUser";
import { CreateUserSchema, createUserProps } from "@/types/createUser";
import { ButtonLoader } from "@/components/loaders/buttonLoader/buttonsLoader";
import { useLoading } from "@/hooks/useLoading";

export default function Home() {
  const { state, handleRender } = useRenderLogin();
  const { loading, setLoading } = useLoading();
  console.log(state);
  const { register, handleSubmit } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserProps),
  });

  async function handle({
    email,
    username,
    password,
    photo,
  }: CreateUserSchema) {
    setLoading(true);
    try {
      if (email && password && !username && state) {
        await LoginAction({ email, password });
      } else if (username && email && password && !state) {
        await addUser({ email, username, password, photo: photo || "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-3/5 h-4/5 bg-zinc-900 text-white/90">
      <section className="flex flex-col w-1/2 h-full p-4 bg-zinc-800 rounded-tl-lg rounded-bl-lg">
        <header className="flex items-center gap-2 p-2 text-zinc-400">
          <Shield size={32} />
          <span className="text-md">Welcome to Password Remember!</span>
        </header>
        <div className="flex flex-col justify-center flex-1">
          <img
            src="logo.png"
            alt="Logo"
            className="object-cover w-full drop-shadow-[5px_5px_5px_#00000073]"
          />
        </div>
        <footer className="flex items-center justify-center h-10 text-sm text-zinc-400">
          © 2024 - All rights reserved - @belone.fraga
        </footer>
      </section>

      <main className="flex flex-col w-1/2 h-full p-4 bg-zinc-950 rounded-tr-lg rounded-br-lg">
        <div className="flex justify-end">
          <button
            onClick={handleRender}
            className="w-16 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-md text-sm transition-colors"
          >
            {state ? "Sign In" : "Login"}
          </button>
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="w-4/5">
            <div className="flex flex-col space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {state ? "Log in to your account" : "Create an account"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {state
                    ? "Enter your credentials to access your account"
                    : "Enter your data below to create your account"}
                </p>
              </div>

              <form
                onSubmit={handleSubmit(handle)}
                className="flex flex-col space-y-2"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Email</label>
                  <input
                    className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="off"
                    {...register("email")}
                  />
                </div>

                {!state && (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Username</label>
                    <input
                      className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                      id="username"
                      placeholder="Ex: John Doe"
                      autoComplete="off"
                      {...register("username")}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-sm">Password</label>
                  <input
                    className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    id="password"
                    placeholder="Your password"
                    type="password"
                    autoComplete="off"
                    {...register("password")}
                  />
                </div>

                <button
                  type="submit"
                  className={`h-9 w-full rounded-md text-zinc-950 ${
                    loading
                      ? "bg-zinc-800"
                      : "bg-white hover:bg-gray-200 transition-colors"
                  }`}
                  disabled={loading}
                >
                  {loading ? <ButtonLoader /> : state ? "Log In" : "Sign Up"}
                </button>
              </form>
            </div>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a className="text-white underline">Terms of Service</a> and{" "}
              <a className="text-white underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
