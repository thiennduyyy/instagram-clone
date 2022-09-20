import { useState } from "react"
import PhotoDetail from "../photodetail"

export default function SinglePhoto({ photo }) {
    const [show, setShow] = useState(false)
    console.log(photo.likes.length)
    const [liked, setLiked]  = useState(photo.userLikedPhoto)
    const [comments, setComments] = useState(photo.comments)
    const [likedCount, setLikedCount] = useState(photo.likes.length)
    const modalClick = () => {
        setShow(false)
    }
    return (
        <div key={photo.docId} className='relative group hover:cursor-pointer' onClick={(event) => setShow(true)}>
            <img src={photo.imageSrc} alt={photo.caption} className='h-80 w-80 object-cover'/>
            <div className='absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden'
            >
                <p className='flex items-center text-white font-bold'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-8 mr-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {likedCount}
                </p>
                <p className="flex items-center text-white font-bold">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-8 mr-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {comments.length}
                </p>
            </div>
            {show && <PhotoDetail content={photo} controller={{likedCount, setLikedCount, liked, setLiked, comments, setComments}} modalClick={modalClick}/>}
        </div>
    )
}