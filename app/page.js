import Image from "next/image";
import Dashboard from "./admin/Dashboard/page";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="">
        <Dashboard/>
      </main>

    </div>
  );
}
