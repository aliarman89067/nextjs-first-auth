"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);
  const verifiedUserToken = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyemail", { token });
      if (data.success === false) {
        setError(true);
        console.log(data.error);
        return;
      }
      setVerify(true);
      console.log(data);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
      return;
    }
  };
  useEffect(() => {
    const tokenData = window.location.search.split("=")[1] || "";
    setToken(tokenData);
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifiedUserToken();
    }
  }, [token]);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-white">Verify User</h1>
      <p className="text-gray-100 text-lg">{token ? token : "No Token Yet"}</p>
      {verify && (
        <div className="flex flex-col gap-2 items-center ">
          <p className="text-gray-100 text-lg">You are Verified Successfully</p>
          <Link className="text-gray-100 text-lg underline" href={"/profile"}>
            Go Back
          </Link>
        </div>
      )}
      {error && <p className="text-red-500 text-lg">Something went wrong!</p>}
    </div>
  );
}
