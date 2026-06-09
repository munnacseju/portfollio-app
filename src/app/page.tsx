import { Hero, About } from "@/components/MainSections";
import { Experience, Skills } from "@/components/SkillsExperience";
import { Projects } from "@/components/Projects";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-24">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <ContactForm />
      <footer className="py-10 text-center text-zinc-600 text-sm border-t border-zinc-900">
        © {new Date().getFullYear()} Motiur Rahman. Built with Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}
