import { cvData } from "@/data/cv";

export const Projects = () => (
  <section id="projects" className="py-16">
    <h3 className="text-3xl font-bold mb-8 border-b border-zinc-800 pb-2">Projects</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {cvData.projects.map((project, index) => (
        <div key={index} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition">
          <h4 className="text-xl font-bold mb-3">{project.title}</h4>
          <p className="text-zinc-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-500">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
