import Profile from "../../components/Profile"
import "aos/dist/aos.css";
import ResetPasswordForm from '../../components/ResetPasswordForm'
export default function ProfilePage() {  

return(
<div   className=" relative ">
    
    <div id="resetpasswordform" className="absolute hidden bg-white/10 backdrop-blur-md justify-center items-center w-full h-full z-10">
        <ResetPasswordForm/>
    </div>
   <div>
    <Profile/>
   </div>
</div>
)}