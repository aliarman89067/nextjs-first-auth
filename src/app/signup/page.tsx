"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSignUp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/signup", user);
      if (data.success === false) {
        console.log(data.error);
        return;
      }
      console.log(data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed" + error);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-start justify-center min-h-screen p-2 max-w-sm mx-auto">
      <h1 className="text-center w-full">
        {loading ? "Processing" : "Signup"}
      </h1>
      <br />
      <label htmlFor="username">username</label>
      <input
        className="p-2 text-black rounded-md border-none outline-none w-full"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 text-black rounded-md border-none outline-none w-full"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="username">password</label>
      <input
        className="p-2 text-black rounded-md border-none outline-none w-full"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="username"
      />
      <button
        onClick={onSignUp}
        disabled={buttonDisabled}
        className="p-2 rounded-md border text-white border-white w-full mt-4 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <p className="text-center w-full mt-2">
        Already have an Account <Link href={"/login"}>Login?</Link>
      </p>
    </div>
  );
}
