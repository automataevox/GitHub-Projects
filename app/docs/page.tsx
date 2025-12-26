"use client";

import { DocumentGrid } from "@/components/doc/documentGrid";

type DocumentItem = {
  title: string;
  description: string;
  path: string; // route to the document page
};

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10 w-full">
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Documentations
        </h1>
        <p className="mt-2 text-foreground/70">
          Explore Whitepapers and documentation of projects and experiments        </p>
      </div>
      <DocumentGrid />
    </section>
  );
}
