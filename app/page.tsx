import { ProjectGrid } from "@/components/project/ProjectGrid";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10 w-full">
      {/* Hero / Intro */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome to Orixa
        </h1>
        <p className="mt-2 text-foreground/70">
          Explore all projects in the Orixa ecosystem. Click a project to see details, features, and docs.
        </p>
      </div>

      {/* Project Grid */}
      <ProjectGrid />
    </section>
  );
}
