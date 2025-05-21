import { useState } from "react"
import { BottomInfo } from "../components/BottomInfo"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Loader from "../components/Loader"

export const Signin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault()
        setLoader(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`, {
                username,
                password
            })

            localStorage.setItem('token', res.data.token)
            console.log('Token: ', res.data.token)

            setLoader(false)

            navigate('/dashboard')
        } catch (error) {

            if (error.response) {
                console.log('Signup failed: ', error.response.data.message)
                alert(error.response.data.message)
            setLoader(false)

            } else {
                console.log('Signup failed: ', error.message)
            }

        }
    }

    if(loader) return <Loader />

    return (
        <div className="relative min-w-screen h-screen bg-slate-950 overflow-hidden flex justify-center items-center z-10">

            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] -z-10"></div>

            <div className="absolute bottom-0 right-[-20%] top-[1%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] -z-10">
            </div>

            <div className="bg-[#16112EB5] h-3/4 min-w-[33%] flex rounded-xl flex-col justify-around text-white p-6">
                <h1 className="text-5xl font-medium">Welcome Back</h1>

                <div>

                    <form onSubmit={handleForm} className="bg-transparent flex flex-col gap-5">
                        <InputBox onChange={(e) => {
                            setUsername(e.target.value)
                        }} type={'email'} placeholder={'Email'} />

                        <InputBox onChange={(e) => {
                            setPassword(e.target.value)
                        }} type={'password'} placeholder={'Password'} />

                        <Button label={'Signin'} />
                    </form>
                </div>

                <BottomInfo label={"Don't have an account?"} btnText={'Signup'} to='/Signup' />
            </div>
        </div>
    )
}

