import UserInfo from "../../components/userInfo";
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