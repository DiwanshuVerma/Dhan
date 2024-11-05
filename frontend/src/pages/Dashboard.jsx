import { useEffect, useState } from 'react'
import { Appbar } from '../components/Appbar'
import { Users } from '../components/Users'
import axios from 'axios'


export const Dashboard = () => {
    return (
        <div className="md:px-10 sm:px-6 px-3 py-10 text-white min-w-screen min-h-screen bg-slate-950 overflow-hidden z-10 flex flex-col gap-4">
            <Appbar/>
            <Balance />
            <Users />
        </div>
    )
}


const Balance = () => {
    const [balance, setBalance] = useState(0)
    const token = localStorage.getItem('token')

    useEffect(() => {

        async function fetchBalance() {
            try {
                const res = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setBalance(res.data.balance)
            } catch (error) {
                console.log('Error while fetching balance: ', error)
            }
        }
            fetchBalance()
        }, [])
    return (
        <div className="text-2xl p-4">
            <div>Your Balance <span className='text-green-500 font-semibold'>${balance.toFixed(2)}</span></div>
        </div>
    )
}