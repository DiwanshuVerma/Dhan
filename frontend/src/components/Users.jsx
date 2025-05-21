import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')
    const [debounceFilter, setDebounceFilter] = useState(filter)


    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceFilter(filter)
        }, 300)

        return () => {
            clearTimeout(timerId)
        }
    }, [filter])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/bulk?filter=` + debounceFilter)
            .then(res => {
                setUsers(res.data.user)
            })

    }, [debounceFilter])

    // below is local filtering, but we are sending request direct to backend to show searched users
    //const filteredUsers = users.filter(user => user.firstName.includes(filter) || user.lastName.includes(filter))

    return (
        <div className="flex flex-col gap-4 p-4 mt-6">
            <p className="text-3xl ">Registered users</p>

            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search Users..." className="p-3 bg-[#2c2050] rounded-md text-xl pl-3" />
            <div>
                {users.map(user =>
                    <User key={user.username} user={user} />
                )}
            </div>

        </div>
    )
}

const User = ({ user }) => {
    const [balance, setBalance] = useState(0)
    const [me, setMe] = useState('')

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    // fetch balance of each user by sending their id as query
    useEffect(() => {
        async function fetchBal() {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance?userId=${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setBalance(res.data.balance)
        }
        fetchBal()
    }, [])

    // fetch logged user to disable send money button to himself
    useEffect(() => {
        async function fetchUserId(){
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
                headers : {
                    authorization: `Bearer ${token}`
                }
            })
            setMe(res.data.userId)
        }
        fetchUserId()
    }, []);
    return (
        <div className={`flex justify-between items-center p-3 mt-3 ${user._id === me ? 'opacity-50 pointer-events-none' : ''}`}>

            <p className={` ${user._id === me ? 'absolute left-1 sm:text-2xl text-sm' : 'hidden'}`}>Me</p>

            <div className="flex items-center gap-3 flex-1">
                <div className="border-none bg-[#2c2050] rounded-full sm:w-9 w-6 sm:h-9 h-6 sm:p-6 p-4 sm:text-2xl text-lg cursor-pointer flex items-center justify-center uppercase top-0">{user.firstName[0]}</div>
                <p className="sm:text-2xl text-lg">{user.firstName} {user.lastName}</p>
            </div>

            <div className="flex-1 text-center">
                <p className="text-base"> <span className="text-green-600">${balance.toFixed(2)}</span></p>
            </div>

            <div>
                <button onClick={() => {
                    navigate('/send?id=' + user._id + '&name=' + user.firstName)
                }} className="w-full sm:h-[44px] h-8 whitespace-nowrap bg-[#75238a] sm:text-xl text-base sm:p-2 p-1 rounded-md active:bg-[#b54ecf] ">
                    Send Money
                </button>
            </div>
        </div>
    )
}


