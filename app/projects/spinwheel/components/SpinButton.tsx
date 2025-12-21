import clsx from "clsx";

export default function SpinButton({spinning, spin}:any) {
    
    return (
        <button
            disabled={spinning}
            onClick={spin}
            className={clsx(
                "px-6 py-3 rounded-xl font-semibold transition-all",
                spinning
                    ? "bg-indigo-600/50 cursor-not-allowed text-white/70"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
            )}
        >
            {spinning ? "Spinning..." : "Spin 🎡"}
        </button>
    )
}