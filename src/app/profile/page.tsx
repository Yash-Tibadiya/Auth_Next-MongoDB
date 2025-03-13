"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      setData(res.data.data._id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      toast.error("User details not found", error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Profile</h1>
      <hr />
      <h2 className="text-2xl font-bold my-4">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <div className="flex gap-8 justify-between items-center">
        <button
          onClick={logout}
          className="text-xl font-bold p-4 bg-blue-500 rounded-lg"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="text-xl font-bold p-4 bg-green-500 rounded-lg"
        >
          User Details
        </button>
      </div>
    </div>
  );
}
