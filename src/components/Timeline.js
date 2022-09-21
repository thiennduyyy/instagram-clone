import Skeleton from "react-loading-skeleton"
import usePhotos from "../hooks/use-photos"
import "react-loading-skeleton/dist/skeleton.css"
import Post from "./post"

export default function Timeline() {
    const { photos } = usePhotos()
    console.log(photos)
    return (
    <div className="container col-span-7 mr-10">
        {!photos ? (
            <Skeleton highlightColor="#fff" count={3} width={470} height={400} className='mb-2'/>
        ): photos?.length > 0 ? (
            photos.map((content) => <Post key={content.docId} content={content}/>)
        ) : (
            <p className="text-center text-2xl">Follow people to see photos!</p>
        )}
    </div>
    )
}