// common.ts

// Status colors (soft but readable on dark background)
export const STATUS_COLORS: Record<string, string> = {
    beta: "bg-yellow-500/80 text-black",     // softer, slightly transparent yellow
    wip: "bg-red-500/80 text-white",         // slightly muted red
    stable: "bg-green-500/80 text-white",    // softer green
    default: "bg-white/10 text-white/70",    // very subtle neutral
  };
  
  // Type colors (futuristic, muted but vibrant)
  export const TYPE_COLORS: Record<string, string> = {
    library: "bg-indigo-500/70 text-white",  // softer indigo
    service: "bg-cyan-500/70 text-white",    // more futuristic cyan/teal
    default: "bg-white/10 text-white/70",    // subtle neutral
  };
  