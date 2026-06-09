import { cvData } from "@/data/cv";

export const Experience = () => (
  <section id="experience" className="py-16">
    <h3 className="text-3xl font-bold mb-8 border-b border-zinc-800 pb-2">Experience</h3>
    <div className="space-y-12">
      {cvData.experience.map((exp, index) => (
        <div key={index} className="relative pl-8 border-l border-zinc-800">
          <div className="absolute w-4 h-4 bg-zinc-700 rounded-full -left-[9px] top-1" />
          <h4 className="text-xl font-bold">{exp.role} @ <span className="text-zinc-400">{exp.company}</span></h4>
          <p className="text-sm text-zinc-500 mb-2">{exp.period}</p>
          <p className="text-zinc-300">{exp.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export const Skills = () => (
  <section id="skills" className="py-16">
    <h3 className="text-3xl font-bold mb-6 border-b border-zinc-800 pb-2">Skills</h3>
    <div className="flex flex-wrap gap-3">
      {cvData.skills.map((skill) => (
        <span key={skill} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300">
          {skill}
        </span>
      ))}
    </div>
  </section>
);
