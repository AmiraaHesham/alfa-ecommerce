import Image from "next/image";
import SignInForm from "../components/SignIn_Form";

export default function SignIn() {
  return (
    <div className="h-screen">
       <div className="w-full h-full flex md:flex-row xs:flex-col ">
          <SignInForm  popUp={false}  />
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
       
  );
}
