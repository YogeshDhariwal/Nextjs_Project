import dbConnect from "../lib/dbConnect";

export default async function Home() {
  await dbConnect();
  
  return (
    <main>
      <h1>Welcome to Message App</h1>
      <p>Database connected successfully</p>
    </main>
  );
}
