import Table from "../../components_admin/returns/Table"
export default function Returns() {
return(
        <div className="bg-[#F9FAFB]">
          {/* <div className="flex w-full flex-col justify-center items-center mt-6 relative"> */}
          <div className="flex w-full  flex-col justify-center items-center  relative">
            <div className="px-5 w-full mt-3 ">
              {/* <Orders_Details /> */}
              <Table />
            </div>
          </div>
        </div>
)}