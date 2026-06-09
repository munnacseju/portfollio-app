import { cvData } from "@/data/cv";

export const Hero = () => (
  <section className="py-20 flex flex-col items-center text-center">
    <h1 className="text-5xl md:text-7xl font-bold mb-4">{cvData.name}</h1>
    <h2 className="text-2xl md:text-3xl text-zinc-400 mb-8">{cvData.role}</h2>
    <a href="#contact" className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition">
      Get in Touch
    </a>
  </section>
);

export const About = () => (
  <section id="about" className="py-16">
    <h3 className="text-3xl font-bold mb-6 border-b border-zinc-800 pb-2">About Me</h3>
    <p className="text-lg text-zinc-300 leading-relaxed">{cvData.summary}</p>
  </section>
);
