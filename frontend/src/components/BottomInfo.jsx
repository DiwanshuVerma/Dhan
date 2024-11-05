import { Link } from "react-router-dom"

export const BottomInfo = ({label, btnText, to}) => {

    return (
        <div className="text-xl flex justify-center gap-2">
            <p>{label}</p>
            <Link to={to} className="active:text-red-600 text-blue-600">
                {btnText}
            </Link>
        </div>
    )
}