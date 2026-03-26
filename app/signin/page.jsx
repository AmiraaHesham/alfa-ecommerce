// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
import Image from "next/image";
import SignInForm from "../components/SignIn_Form";

export default function SignIn() {
  // const handleLogin = async () => {
  //     let email = document.querySelector(".Email")
  //     let pass = document.querySelector(".password")

  //     try {
  //         const res = await axios.post('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/authLec/login', {
  //             email: emailRef.current.value,
  //             password: passwordRef.current.value
  //         },
  //         )
  //         console.log(res)

  //         let token = res.data.token
  //         let name = res.data.data.name
  //         let profileImage = res.data.data.profileImage
  //         let email = res.data.data.email
  //         let id = res.data.data._id
  //         let role = res.data.data.role
  //         localStorage.setItem('token', token)
  //         localStorage.setItem('name', name)
  //         localStorage.setItem('profileImage', profileImage)
  //         localStorage.setItem('email', email)
  //         localStorage.setItem('id', id)
  //         localStorage.setItem('role', role)
  //         // if (localStorage.role === 'admin') {
  //         //     // navigate('/CreateLecturer')
  //         // }
  //         // else { navigate('/Dashboard') }

  //     }

  //     catch (error) {
  //         email.style.border = '2px solid brown'
  //         pass.style.border = '2px solid brown'
  //         console.log(error)
  //         toast.error('Incorrect email or password')

  //     }
  // }

  // useEffect(() => {
  //     checkToken()
  // },)
  // const checkToken = () => {

  //     switch (localStorage.getItem("role")) {
  //         case 'admin':
  //             // navigate('/CreateLecturer');
  //             break;
  //         case 'manager':
  //             // navigate('/Dashboard');
  //             break;

  //         default:
  //             // navigate('');
  //             break;

  //     }

  // }
  return (
    <div className="h-screen">
      <div className=" w-full h-screen ">
        <div className=" h-full flex md:flex-row xs:flex-col ">
          <SignInForm />
          <div className="h-full w-full md:order-2 xs:order-1">
            <Image
              src="/Images/imageSignUp.png"
              alt="Background Image"
              width={500}
              height={500}
              priority
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
