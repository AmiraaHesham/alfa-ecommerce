import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Form_contact from "../../components_admin/contact/contactForm.jsx";
import Image from "next/image";

export default function ContactPage() {

    return (
      <div className="w-full h-full bg-[#F9FAFB]">
       
            <div className=" px-7 mt-4   ">
              <Form_contact />
            </div>
       
      </div>
    );

}
