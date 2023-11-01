"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  async function onLogout() {
    await axios
      .get("/api/users/logout")
      .then(({ data }) => {
        if (data.success === false) {
          console.log(data.error);
          return;
        }
        console.log(data);
        router.push("/login");
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  useEffect(() => {
    axios.get("/api/users/me").then(({ data }) => {
      setUser(data.user._id);
    });
  }, []);
  async function handleResetPassword() {
    try {
      const { data } = await axios.post("/api/users/reset");
      if (data.success === false) {
        console.log(data.error);
        return;
      }
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <button
        onClick={onLogout}
        className="bg-white px-2 py-1 rounded-md text-black mt-2"
      >
        Logout
      </button>
      <button className="bg-purple-600 px-2 py-1 rounded-md text-white mt-2">
        {user ? <Link href={`/profile/${user}`}>{user}</Link> : "Empty"}
      </button>
      <button
        onClick={handleResetPassword}
        className="bg-purple-600 px-2 py-1 rounded-md text-white mt-2"
      >
        Reset Password
      </button>
    </div>
  );
}
