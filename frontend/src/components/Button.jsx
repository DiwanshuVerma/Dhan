export const Button = ({label, onClick}) => {
    return (
        <div className="w-full text-center mt-4">
            <button onClick={onClick} className="w-1/2 bg-[#75238a] text-xl  p-2 rounded-full">
                {label}
            </button>
        </div>
    )
}