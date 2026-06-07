"use client";
import Cartpage from "../components/cart";
import SignIn_Form from "../../components/SignIn_Form";
import SignUp_Form from "../../components/SignUp_Form";
import { MdCancel } from "react-icons/md";
import { useState } from "react";

export default function Cart() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignin, setShowSignIn] = useState(false);
  return (
    <div className="">
      <div
        className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${showSignUp ? "block" : "hidden"}`}
      >
        <div className=" bg-white rounded-md relative">
          <MdCancel
            className="w-6 h-6 cursor-pointer hover:text-red-600 absolute top-2 right-2 "
            onClick={() => {
              setShowSignUp(false);
            }}
          />
          {showSignin ? (
            <SignIn_Form popUp={true} setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />
          ) : showSignUp? (
            <SignUp_Form popUp={true} setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />          ):""}
        </div>
      </div>

      <Cartpage setShowSignUp={setShowSignUp} />
    </div>
  );
}
