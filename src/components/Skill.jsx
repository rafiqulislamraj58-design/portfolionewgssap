import React, { useState } from 'react';

const skillsData = [
  {
    id: "01",
    category: "FRONT-END ARCHITECTURE",
    items: ["React.js", "Next.js", "Tailwind CSS", "DaisyUI", "JavaScript (ES6+)", "HTML5 / CSS3"],
    description: "Building responsive, component-driven user interfaces with optimized performance and fluid animations."
  },
  {
    id: "02",
    category: "BACK-END & DATABASE",
    items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT Authentication"],
    description: "Developing robust server-side logic, secure RESTful APIs, and efficient database schemas."
  },
  {
    id: "03",
    category: "TOOLS & DEPLOYMENT",
    items: ["Git & GitHub", "Vercel", "VS Code", "Postman", "Adobe Photoshop", "Illustrator"],
    description: "Managing version control, modern deployment pipelines, and digital graphic design workflows."
  },
  {
    id: "04",
    category: "CORE COMPETENCIES",
    items: ["Software Engineering", "Full-Stack Integration", "UI/UX Prototyping", "Responsive Design", "Problem Solving"],
    description: "Translating conceptual frameworks and clean architectural patterns into scalable web applications."
  }
];

const proficiencyData = [
  { tech: "React.js / Next.js", level: "92%" },
  { tech: "Tailwind CSS / UI", level: "95%" },
  { tech: "JavaScript (ES6+)", level: "88%" },
  { tech: "Node.js / Express", level: "80%" },
  { tech: "MongoDB / Database", level: "82%" }
];

const workflowSteps = [
  { step: "01", title: "CONCEPT & UI", desc: "Wireframing layouts and planning component structure." },
  { step: "02", title: "FRONT-END CODE", desc: "Developing interactive components with React, Next.js & Tailwind." },
  { step: "03", title: "BACK-END LOGIC", desc: "Setting up Node/Express APIs and database schemas." },
  { step: "04", title: "DEPLOY & SHIP", desc: "Testing, performance optimization, and Vercel deployment." }
];

const Skill = () => {
  const [activeId, setActiveId] = useState("01");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono py-16 px-6 md:px-16 lg:px-24 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center text-xs tracking-[0.25em] uppercase border-b border-zinc-800 pb-4 mb-12 text-zinc-500">
          <span>SYSTEM DIRECTORY — SKILLS & STACK</span>
          <span className="text-emerald-400">MERN & SOFTWARE ENGINEERING</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-8 flex flex-col space-y-4">
            {skillsData.map((skill) => {
              const isActive = activeId === skill.id;
              return (
                <div 
                  key={skill.id}
                  onMouseEnter={() => setActiveId(skill.id)}
                  className={`group cursor-pointer border-b border-zinc-900 pb-6 transition-all duration-300 ${
                    isActive ? 'opacity-100 pl-4 border-l-2 border-emerald-500' : 'opacity-40 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="text-xs text-zinc-600 font-mono">{skill.id}</span>
                    <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-zinc-400'
                    }`}>
                      {skill.category}
                    </h2>
                  </div>

                  {isActive && (
                    <div className="mt-4 pl-8 animate-fadeIn">
                      <p className="text-zinc-400 text-sm md:text-base font-sans font-light mb-4 max-w-2xl">
                        {skill.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, idx) => (
                          <span key={idx} className="bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs px-3 py-1 rounded-md">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="border border-zinc-800 bg-zinc-900/50 p-6 rounded-xl backdrop-blur-md shadow-2xl">
              <div className="flex justify-between items-center text-xs text-zinc-500 mb-6 pb-3 border-b border-zinc-800">
                <span>ACTIVE MODULE</span>
                <span className="text-emerald-400">STATUS: ONLINE</span>
              </div>
              
              <div className="h-48 flex flex-col justify-center items-center text-center border border-dashed border-zinc-800 rounded-lg p-6 bg-black/40">
                <span className="text-emerald-500 text-3xl font-bold mb-2">#{activeId}</span>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
                  {skillsData.find(s => s.id === activeId)?.category}
                </h3>
                <p className="text-xs text-zinc-400">
                  Hover over the left menu items to inspect core technologies and stack components.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 flex justify-between">
                <span>DEVELOPER: RAJ</span>
                <span>GAZIPUR, BD</span>
              </div>
            </div>

            <div className="border border-zinc-800 bg-zinc-900/40 p-6 rounded-xl">
              <h4 className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-bold border-b border-zinc-800 pb-2">
                CORE PROFICIENCY METRICS
              </h4>
              <div className="space-y-3">
                {proficiencyData.map((p, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>{p.tech}</span>
                      <span className="text-emerald-400">{p.level}</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: p.level }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-12 border-t border-zinc-800">
          <div className="mb-8">
            <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-1">EXECUTION PIPELINE</span>
            <h3 className="text-2xl md:text-3xl font-bold uppercase text-white tracking-wide">
              HOW I SHIP APPLICATIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((w, idx) => (
              <div key={idx} className="border border-zinc-800 bg-zinc-900/30 p-6 rounded-xl relative hover:border-emerald-500/50 transition-all duration-300 group">
                <span className="text-zinc-600 text-3xl font-extrabold absolute top-4 right-4 group-hover:text-emerald-500/20 transition-colors">
                  {w.step}
                </span>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">
                  {w.title}
                </h4>
                <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Skill;