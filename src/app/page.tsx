import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-bold m-8">Hello 👋</h1>
      <div className="flex gap-12">
        <Link
          href="/login"
          className="text-xl font-bold p-4 bg-blue-500 rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-xl font-bold p-4 bg-blue-500 rounded-lg"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
