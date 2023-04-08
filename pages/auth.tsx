import Input from "@/components/Input";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
function Auth() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<string>("login");
  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-no-repeat bg-fixed bg-cover  bg-[url('/images/hero.jpg')]">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image height={60} width={120} src="/images/logo.png" alt="logo" />
        </nav>
        <div className="flex justify-center">
          <div
            className="bg-black bg-opacity-70 
           px-16 py-16 self-center mt-2 lg:w-2/5 lg: max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  value={name}
                  id="name"
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                type="email"
                value={email}
                id="email"
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                type="password"
                value={password}
                id="password"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (variant === "login") {
                  login();
                } else if (variant === "register") {
                  register();
                }
              }}
              className="bg-red-600 text-white py-3  rounded-md  w-full mt-10 hover:bg-red-700
            transition">
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center  ">
              <div
                onClick={(e) => {
                  e.preventDefault();

                  signIn("google", { callbackUrl: "/profile" });
                }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>

              <div
                onClick={(e) => {
                  e.preventDefault();

                  signIn("github", { callbackUrl: "/profile" });
                }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer">
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
