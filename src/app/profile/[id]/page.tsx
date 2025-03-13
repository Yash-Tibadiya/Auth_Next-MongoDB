export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold m-8">Profile</h1>
      <p className="text-2xl font-bold m-8">User ID: {params.id}</p>
    </div>
  );
}
