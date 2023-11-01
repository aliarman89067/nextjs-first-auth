"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function handleResetPassword() {
    if (token.length > 0 && password === confirmPassword) {
      try {
        const { data } = await axios.post("/api/users/resetpassword", {
          token,
          password,
        });
        if (data.success === false) {
          console.log(data.error);
          setError(true);
          return;
        }
        setChanged(true);
        setError(false);
        console.log(data);
      } catch (error: any) {
        console.log(error.message);
        setError(true);
        return;
      }
    }
  }
  useEffect(() => {
    const tokenData = window.location.search.split("=")[1] || "";
    setToken(tokenData);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {changed && <p className="text-white text-center">Password Changed</p>}
      <div className="flex flex-col justify-center items-center border rounded-lg p-4">
        <label className="my-2">
          <p>New Password</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-1 px-2 border-none outline-none rounded-md text-black"
          />
        </label>
        <label className="my-2">
          <p>Confirm Password</p>
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="py-1 px-2 border-none outline-none rounded-md text-black"
          />
        </label>
        <button
          onClick={handleResetPassword}
          className="bg-white text-black py-1 px-2 rounded-md"
        >
          Reset
        </button>
      </div>
      {changed && <Link href={"/profile"}>Go Back</Link>}
    </div>
  );
}
