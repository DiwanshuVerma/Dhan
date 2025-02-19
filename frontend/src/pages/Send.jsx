import { useState } from "react"
import axios from 'axios'
import { useNavigate, useSearchParams } from "react-router-dom"

export const Send = () => {
    const token = localStorage.getItem('token')
    const [amount, setAmount] = useState(0)
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const navigate = useNavigate()

    return (
        <div className="h-screen min-w-screen bg-slate-950 flex justify-center items-center px-4">
            <div className="w-[400px] h-[390px] bg-[#16112EB5] rounded text-white flex flex-col justify-between px-6 py-10">

                <h1 className="text-4xl text-center font-medium">Send Money</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center mb-2">
                        <span className="border-none bg-[#2c2050] rounded-full w-9 h-9 p-6 text-2xl cursor-pointer flex items-center justify-center uppercase">{name[0]}</span>
                        <p className="text-3xl">{name}</p>
                    </div>
                    <span className="text-lg">Amount ( in Dollars )</span>
                    
                    <input onChange={(e) => {
                        setAmount(e.target.value)
                    }} type={'text'} placeholder={'Enter amount'} className="p-3 text-white rounded bg-[#2c2050]"/>

                    <button onClick={async () => {
                        try{
                        const res = await axios.post('https://dhan-qbwh.onrender.com/api/v1/account/transfer',  {
                            amount,
                            to: id
                        },{
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        alert(res.data.message)
                        navigate('/dashboard')
                    } catch(error){
                        alert(error.response.data.message)
                        console.log('transfer failed: ', error.response.data)
                    }
                    }} className="w-full bg-[#75238a] active:bg-[#b54ecf] text-xl p-2 rounded ">
                        Initiate transfer
                    </button>
                </div>
            </div>
        </div>
    )
}
