import SideMenu from "../../../components_admin/SideMenu";
import Header from "../../../components_admin/Header";
import UserInfo from "../../../components_admin/users/userInfo";
export default function UsersPage({ params }) {
  const { id } = params;
  return (
    <div className=" p-5 bg-[#F9FAFB]">
      <div className=" w-full bg-[#F9FAFB]">
        <UserInfo userId={id} />
      </div>
    </div>
  );

}
