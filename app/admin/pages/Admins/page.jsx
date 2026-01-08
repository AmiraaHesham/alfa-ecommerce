import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
// import Form_contact from "../components_admin/contact/contactForm.jsx";
import Admins_Table from "../../components_admin/admins/AdminsTable";
import AdminForm from "../../components_admin/admins/AdminForm";
export default function AdminsPage() {
  return (
    <div className="w-full h-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu admins={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full  ">
          <Header page_title={"Admins Management"} />

          <div className=" mx-7  relative">
            <AdminForm />

            <Admins_Table />
          </div>
        </div>
      </main>
    </div>
  );
}
