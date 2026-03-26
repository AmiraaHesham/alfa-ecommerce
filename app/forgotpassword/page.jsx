import Image from "next/image";
import ForgotPassword from "../components/ForgotPassword_form";

export default function SignIn() {
  return (
    <div className="h-screen">
      <div className=" w-full h-screen ">
        <div className=" h-full flex md:flex-row xs:flex-col ">
          <ForgotPassword />
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
