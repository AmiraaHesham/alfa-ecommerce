import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen bg-color1">
        <Image width={200} height={200} priority src="/Images/logo.png" alt="" className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse" />
        <h1 className="md:text-5xl xs:text-4xl  font-serif font-semibold animate-pulse bg-gradient-to-r from-[#d62828] via-color3 to-color2 bg-clip-text text-transparent "></h1>
      </div>
  );
}