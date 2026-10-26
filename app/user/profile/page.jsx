import Profile from "./components/Profile"
import "aos/dist/aos.css";
import ResetPasswordForm from './components/ResetPasswordForm'
import RequireAuth from "../components/RequireAuth";

export default function ProfilePage() {  

return(
<RequireAuth>
  <div   className=" relative ">
      
     <div>
      <Profile/>
     </div>
  </div>
</RequireAuth>
)}