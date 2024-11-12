import UsersList from "./components/UsersList";

export default function Home() {
  return (
    <main className="py-10 px-10 border w-full h-[calc(100vh-5rem)]  flex ">
      <UsersList />
    </main>
  );
}
