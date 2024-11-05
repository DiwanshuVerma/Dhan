
import { useState } from "react"
import { BottomInfo } from "../components/BottomInfo"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    return (
        <div className="relative min-w-screen h-screen bg-slate-950 overflow-hidden flex justify-center items-center z-10">

            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] -z-10"></div>

            <div className="absolute bottom-0 right-[-20%] top-[1%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] -z-10">
            </div>

            <div className=" bg-[#16112EB5] min-h-[540px] h-4/5 min-w-[33%] flex rounded-xl flex-col justify-around text-white p-6">
                <h1 className="text-5xl font-medium">Create Account</h1>


                <div className="bg-transparent flex flex-col gap-3">
                    <InputBox onChange={(e) => {
                        setFirstName(e.target.value)
                    }} type={'text'} placeholder={' name'} />

                    <InputBox onChange={(e) => {
                        setLastName(e.target.value)
                    }} type={'text'} placeholder={'Last name'} />

                    <InputBox onChange={(e) => {
                        setEmail(e.target.value)
                    }} type={'email'} placeholder={'Email'} />

                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} type={'password'} placeholder={'Password'} />

                    <Button onClick={async () => {
                        try {
                            const res = await fetch('http://localhost:3000/api/v1/user/signup', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', // Specify the content type
                                  },
                                body: JSON.stringify({
                                    firstName,
                                    lastName,
                                    username: email,
                                    password
                                })
                            }
                            )

                            // check if the response is successful
                            const json = await res.json()

                            if (!res.ok) {
                                alert(json.message)
                                throw new Error(`Error: ${res.status} ${res.statusText} ${json.message}`)
                            }
                            
                            localStorage.setItem('token', json.token)
                            console.log(json.message)
                            navigate('/dashboard')
                        } catch (error) {
                            console.log('Signup failed: ', error.message)
                        }
                    }} label={'Signup'} />
                </div>



                <BottomInfo label={'Already have an account?'} btnText={'Signin'} to='/Signin' />

            </div>
        </div>
    )
}
