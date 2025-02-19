import { useEffect, useState } from 'react'
import { Appbar } from '../components/Appbar'
import { Users } from '../components/Users'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Dashboard = () => {
    return (
        <div className="md:px-10 sm:px-6 px-0 py-10 text-white min-w-screen min-h-screen bg-slate-950 overflow-hidden z-10 flex flex-col gap-4">
            <Appbar />
            <Balance />
            <Users />
        </div>
    )
}


const Balance = () => {
    const [balance, setBalance] = useState(0)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchBalance() {
            try {
                const res = await axios.get('https://dhan-qbwh.onrender.com/api/v1/account/balance', {
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

    const handleLogOut = () => {
       if(window.confirm("Do you really want to log out?")) {
            localStorage.removeItem('token')
            navigate('/signin')
        }

    }
    return (
        <div className="text-2xl items-center p-4 flex justify-between">
            <div>Your Balance <span className='text-green-500 font-semibold'>${balance.toFixed(2)}</span></div>
            <div onClick={handleLogOut}
                className=' text-lg flex items-center rounded-md px-2 bg-red-700 cursor-pointer'>
                <p className='sm:block hidden'>Log out</p>
                <img className='sm:w-10 w-8' src='logout.svg' />
            </div>
        </div>
    )
}