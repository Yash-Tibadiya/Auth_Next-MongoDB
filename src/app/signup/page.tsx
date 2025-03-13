"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error);
      toast.error("Signup failed. User already exists.");
    } finally {
      setLoading(false); // Ensure loading is set to false after login attempt
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <div className="flex flex-row justify-between w-80 items-center m-4">
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black bg-amber-50"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
      </div>
      <div className="flex flex-row justify-between w-80 items-center m-4">
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black bg-amber-50"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
      </div>
      <div className="flex flex-row justify-between w-80 items-center m-4">
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black bg-amber-50"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
      </div>

      <button
        className="p-2 border border-gray-700 rounded-lg  focus:outline-none focus:border-gray-600 text-black bg-blue-500"
        onClick={onSignup}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No input" : "Signup"}
      </button>

      <div className="flex flex-row justify-center w-80 items-center m-4">
        <pre>Already have an account? </pre>
        <Link href="/login" className="text-blue-500">Login</Link>
      </div>

    </div>
  );
}
