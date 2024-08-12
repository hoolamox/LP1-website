import Image from "next/image";
import MAIN_IMAGE from "@/assets/hero.png";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 items-center justify-center h-screen select-none">
      <Image src={MAIN_IMAGE.src} alt="Home Image" width={128} height={128} priority className="flex self-center" />
      {/* <div className="flex flex-col items-center">
        <p className="text-gray-800 font-bold">
          EVE
        </p>
        <div className="flex flex-row gap-4 items-center justify-center">
          <a href="/single-1" target="_blank" className="text-gray-800 hover:text-gray-400">
            [ Single 1. ]
          </a>
        </div>
      </div> */}
    </main>
  );
}
