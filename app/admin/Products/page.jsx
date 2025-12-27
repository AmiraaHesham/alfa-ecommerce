import SideMenu from "../components_admin/SideMenu";
import Header from "../components_admin/Header";
import FormProduct from "../components_admin/products/FormProduct";
import Table_Products from "../components_admin/products/Table_Products";

export default function Products() {
  return (
    <div className="h-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu products={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full">
          <Header page_title={"Products Management"} />

          <div className="mx-10 mt-6 relative">
            <FormProduct />
            <Table_Products />
          </div>
        </div>
      </main>
    </div>
  );
}
