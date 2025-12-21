import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          path={project.path}
          type={project.type}
          status={project.status}
        />
      ))}
    </div>
  );
};
