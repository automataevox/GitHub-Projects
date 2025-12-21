import clsx from "clsx"; 
type Mode = "followers" | "subscribers";

export default function ModeSwitch({mode, setMode, setWinner, spinning}:any) {
    return (
        <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
            {(["followers", "subscribers"] as Mode[]).map((m) => (
                <button
                    key={m}
                    onClick={() => {
                        if (spinning) return;
                        setMode(m);
                        setWinner(null);
                    }}
                    className={clsx(
                        "px-4 py-2 rounded-lg text-sm transition",
                        mode === m
                            ? "bg-indigo-600 text-white"
                            : "text-white/60 hover:text-white"
                    )}
                >
                    {m === "followers" ? "Followers" : "Subscribers"}
                </button>
            ))}
        </div>
    )
}