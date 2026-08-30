import Image from "next/image";
import CursorGrid from "../components/CursorGrid";
import NavBar from "@/components/main/NavBar";
import HeroSection from "@/components/main/HeroSection";

export default function Home() {
  return (
    <header className="w-full h-dvh relative bg-background flex flex-col overflow-hidden">
      <main className="w-[95%] md:w-[90%] xl:w-[85%] flex-1 mx-auto flex flex-col">
        <NavBar />
        <HeroSection />
      </main>
    </header>
  );
}
