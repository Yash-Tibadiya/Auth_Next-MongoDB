"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error) {
      console.log("Login failed", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Ensure loading is set to false after login attempt
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
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
        onClick={onLogin}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No input" : "Login"}
      </button>

      <div className="flex flex-row justify-center w-80 items-center m-4">
        <pre>Already have an account? </pre>
        <Link href="/signup" className="text-blue-500">
          Signup
        </Link>
      </div>
    </div>
  );
}
