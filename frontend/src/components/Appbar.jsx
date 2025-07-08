import { useEffect, useState } from 'react'
import axios from 'axios'

export const Appbar = () => {
    const [firstName, setFirstName] = useState('')
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        async function fetchUserDetails(){
            const res = await axios.get('https://dhan-qbwh.onrender.com/api/v1/user/me', {
                headers : {
                    authorization: `Bearer ${token}`
                }
            })
            setFirstName(res.data.firstName)
        }
        fetchUserDetails()
    }, [token]);


    return (
        <div>
            <div className="w-full flex justify-between items-center py-2 px-3 rounded-sm shadow-[1px_2px_4px_#2c2050] " >
                <div className="text-2xl font-semibold">
                    <p>Dhan App</p>
                </div>

                <div className="flex items-center gap-4 text-xl">
                    <p>Hello 🖐, {firstName || "Anon"}</p>
                    <button className="border-none bg-[#2c2050] rounded-full w-9 h-9 p-6 text-2xl cursor-pointer flex items-center justify-center uppercase">{firstName[0]}</button>
                </div>
            </div>
        </div>
    )
}

