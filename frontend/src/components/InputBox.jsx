export const InputBox = ({type, placeholder, onChange}) => {
    return (
            <input onChange={onChange} type={type} placeholder={placeholder} className="rounded-full bg-[#020617] p-3 pl-6 text-white text-lg outline-slate-800" />
    )
}