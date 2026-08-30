import NavBar from "@/components/main/NavBar";
import Features from "@/components/main/Features";
import HeroSection from "@/components/main/HeroSection";

export default function Home() {
  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      <div className="w-full h-dvh flex flex-col">
        <main className="w-[95%] md:w-[90%] xl:w-[85%] flex-1 mx-auto flex flex-col">
          <NavBar />
          <HeroSection />
        </main>
      </div>
      <div className="w-[95%] md:w-[90%] xl:w-[85%] flex-1 mx-auto flex flex-col">
        <Features />
      </div>
    </div>
  );
}
