import { STATUS_COLORS, TYPE_COLORS } from "@/data/common";
import { Card } from "@heroui/react";
import NextLink from "next/link";

interface DocumentCardProps {
  title: string;
  description: string;
  path: string;
  category?: string;
  status?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  description,
  path,
  category,
  status,
}) => {
  return (
    <NextLink href={path} className="w-full h-full block">

      <Card
        className="h-full flex flex-col p-5 relative overflow-hidden rounded-2xl cursor-pointer
          bg-gradient-to-tr from-purple-600/10 via-black/5 to-blue-400/10
          shadow-md transition-transform duration-500 ease-in-out
          hover:scale-[1.03] hover:shadow-2xl border-1 border-white/5
          group"
      >
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20
            opacity-0 group-hover:opacity-30 transition-opacity duration-700
            rounded-2xl pointer-events-none"
        />

        {/* Inner soft glow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none" />

        {/* Content */}
        <div className="relative flex flex-col gap-3 z-10 h-full">

          {/* Header */}
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-white">
              {title}
            </h3>

            {status && (
              <span
                className={`text-xs px-2 py-0.5 rounded font-semibold transition-colors duration-300
                  ${STATUS_COLORS[status.toLowerCase()] || STATUS_COLORS.default}
                `}
              >
                {status.toUpperCase()}
              </span>
            )}
          </div>

          {/* Description (fills space) */}
          <p className="text-sm text-white/80 transition-colors duration-300 group-hover:text-white flex-grow">
            {description}
          </p>
        </div>
      </Card>
    </NextLink>
  );
};
