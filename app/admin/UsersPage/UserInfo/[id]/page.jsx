import UserInfo from "../../components/userInfo";
export default function UsersPage({ params }) {
  const { id } = params;
  return (
    <div className=" p-5 ">
      <div className=" w-full ">
        <UserInfo userId={id} />
      </div>
    </div>
  );
}