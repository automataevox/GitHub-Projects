export default function Winner({winner}:any) {
    return (
        <div className="mt-4 px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white shadow-md">
            🎉 Winner: <span className="font-bold">{winner}</span>
        </div>
    )
}