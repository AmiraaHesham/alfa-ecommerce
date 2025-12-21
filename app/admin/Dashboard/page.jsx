import Image from "next/image";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
export default function Dashboard() {
  return (
    <div className="bg-[#F9FAFB]">
      <main className="flex">
        <SideMenu/>
        <div className="w-full">
          <Header/>
        </div>
      </main>

    </div>
  );
}