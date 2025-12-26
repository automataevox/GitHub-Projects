import { DocumentCard } from "./documentCard";
import { documents } from "@/data/documents";

export const DocumentGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 items-stretch">
        {documents.map((document:any) => (
          <DocumentCard
            key={document.id}
            title={document.title}
            description={document.description}
            path={document.path}
            category={document.category}
            status={document.status}
          />
        ))}
    </div>
  );
};
