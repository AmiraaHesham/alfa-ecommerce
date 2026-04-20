import Image from "next/image";
import SignUpForm from "../components/SignUp_Form";

export default function SignUp() {
  return (
    <div className="h-screen">
      <div className="h-full w-full flex md:flex-row xs:flex-col ">
          <SignUpForm />
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
