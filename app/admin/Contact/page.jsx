import SideMenu from "../components_admin/SideMenu";
import Header from "../components_admin/Header";
import Form_contact from "../components_admin/contact/from.jsx";

export default function ContactPage() {
  return (
    <div className="h-full w-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu contact={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full h-full">
          <Header page_title={"Contact Management"} />

          <div className="mx-20 mt-5 bg-white border rounded-md h-full  relative">
            <div className="py-2 h-[650px] ">
              <Form_contact />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
