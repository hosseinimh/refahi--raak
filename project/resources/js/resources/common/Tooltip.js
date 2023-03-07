export default function Tooltip({ message, children }) {
    return (
    <div className="group inline relative ">
        {children}
        <span className="absolute z-50 -top-10 -left-4 scale-0 transition-all rounded bg-gray-800 p-2 text-[8px] text-white group-hover:scale-100">{message}</span>
    </div>
    )
}