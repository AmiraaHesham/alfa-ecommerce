import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, maxRating = (10) }) => {

    const stars = (rating / maxRating) * 5;

    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div style={{ display: "flex", alignItems: "center" }}>

            {Array(fullStars)
                .fill()
                .map((_, index) => (
                    <FaStar key={`full-${index}`} className='text-yellow-400' />
                ))}


            {halfStar === 1 && (
                <FaStarHalfAlt className='text-yellow-400'  />
            )}


            {Array(emptyStars)
                .fill()
                .map((_, index) => (
                    <FaRegStar key={`empty-${index}`} className='text-yellow-400' />
                ))}
        </div>
    );
}

export default StarRating