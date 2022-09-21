import { useContext, useState, useRef } from "react"
import FirebaseContext from "../../context/firebase"
import UserContext from "../../context/user"
import Actions from "./actions"
import AddComment from "./add-comment"
import CaptionAndComments from "./caption-comments"
import Header from "./header"
import Photo from "./photo"
import { toggleLiked } from "../../services/firebase"

export default function PhotoDetail({ content, controller, modalClick }) {
    console.log(content)
    const handleModalClick = (event) => {
        event.stopPropagation()
        modalClick()
    }
    const {likedCount, setLikedCount, liked, setLiked, comments, setComments} = controller
    const {
        user: { uid: userId = ''}
    } = useContext(UserContext)
    // const [comments, setComments] = useState(content.comments)
    const { firebase, FieldValue }= useContext(FirebaseContext)
    const commentInput = useRef(null)
    // const [likedCount, setLikedCount] = useState(content.likes.length)
    // const [liked, setLiked]  = useState(content.userLikedPhoto) 
    const handleFocus = () => commentInput.current.focus()
    console.log(content.userLikedPhoto)
    async function handleToggleLiked() {
        setLiked((liked) => !liked)
        setLikedCount((likedCount) => (liked ? likedCount - 1 : likedCount + 1))
        await toggleLiked(liked, content.docId, userId)
    }
    return (
        <div className='fixed flex h-full top-0 bottom-0 left-0 right-0 bg-black-rgba z-10 hover:cursor-default' onClick={handleModalClick}>
            <div className="flex container w-63p h-95 bg-white m-auto" onClick={event => event.stopPropagation()}>
                <div className="w-58p bg-black-primary">
                    <Photo imageSrc={content.imageSrc}/>
                </div>
                <div className="flex-col relative w-full h-full w-42p bg-white">      
                    <div className="items-center align-items flex-auto">
                        <Header username={content.username}/>
                        <CaptionAndComments caption={content.caption} comments={comments} username={content.username}/>
                    </div>
                    <div className="absolute bottom-0 w-full items-center align-items grow-0">
                        <Actions 
                            docId={content.docId}
                            likedCount={likedCount}
                            likedPhoto={liked}
                            handleToggleLiked={handleToggleLiked}
                            handleFocus={handleFocus}
                        />
                        <AddComment docId={content.docId} comments={comments} setComments={setComments} commentInput={commentInput}/>
                    </div>
                </div>
            </div>
        </div>
    )
}