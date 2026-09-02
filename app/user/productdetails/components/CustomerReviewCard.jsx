import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

export default function CustomerReviewCard({ name, date, rating, review }) {
  return (
    <div className="w-full px-5">
    <div className="w-full bg-[#f6f5f8] rounded-3xl border p-6 flex flex-col gap-1 ">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <span className="text-sm text-gray-500">{date}</span>
      </div>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? <FaStar
            key={star}
            className= "text-[#f5b800]"
          /> :<FaRegStar
            key={star}
            className= "text-gray-300"
          />
         
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed">{review}</p>
    </div>
    </div>
  );
}
