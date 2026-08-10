import { Preloader } from "@/components/motion/preloader";
import { About } from "@/components/sections/about";
import { Awards } from "@/components/sections/awards";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Works } from "@/components/sections/works";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Hero />
      <About />
      <Works />
      <Awards />
      <Contact />
    </main>
  );
}
