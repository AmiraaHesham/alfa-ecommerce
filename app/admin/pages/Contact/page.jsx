import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Form_contact from "../../components_admin/contact/contactForm.jsx";

export default function ContactPage() {
  return (
    <div className="w-full h-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu contact={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full  ">
          <Header page_title={"Contact Management"} />

          <div className=" px-7 mt-4   ">
              <Form_contact />
          </div>
        </div>
      </main>
    </div>
  );
}
