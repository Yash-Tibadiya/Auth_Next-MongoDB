"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  
  useEffect(() => {
    setError(false);
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black m-4">
        {token ? `${token}` : "No token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <div className="flex flex-row justify-center w-80 items-center m-4">
            <pre>Now you can login to your account </pre>
            <Link href="/login" className="text-blue-500">Login</Link>
          </div>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl">Error</h2>
        </div>
      )}
    </div>
  );
}
