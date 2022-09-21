import { useRef, useState, useContext } from "react"
import PropTypes, { shape, string } from 'prop-types'
import Header from "./header"
import Image from "./image"
import Actions from "./action"
import Footer from "./footer"
import Comments from "./comments"
import UserContext from "../../context/user"
import FirebaseContext from "../../context/firebase"


export default function Post( { content }) {
    const {
        user: { uid: userId = ''}
    } = useContext(UserContext)
    const { firebase, FieldValue }= useContext(FirebaseContext)
    const commentInput = useRef(null)
    const [likedCount, setLikedCount] = useState(content.likes.length)
    const [liked, setLiked]  = useState(content.userLikedPhoto) 
    const handleFocus = () => commentInput.current.focus()
    console.log(content.userLikedPhoto)
    const handleToggleLiked = async () => {
        setLiked((liked) => !liked)
        setLikedCount((likedCount) => (liked ? likedCount - 1 : likedCount + 1))
        await firebase
            .firestore()
            .collection('photos')
            .doc(content.docId)
            .update({
                likes: liked ? FieldValue.arrayRemove(userId) 
                : FieldValue.arrayUnion(userId)
            })
    }

    return <div className="rounded-lg col-span-3 border bg-white border-gray-primary mb-8">
        <Header username={content.username}/>
        <Image src={content.imageSrc} caption={content.caption}
            handleToggleLiked={handleToggleLiked}
        />
        <Actions 
            docId={content.docId}
            totalLikes={likedCount}
            likedPhoto={liked}
            handleFocus={handleFocus}
            handleToggleLiked={handleToggleLiked}
        />
        <Footer caption={content.caption} username={content.username}/>
        <Comments 
            docId={content.docId}
            comments={content.comments}
            posted={content.dateCreated}
            commentInput={commentInput}
        />
        
    </div>
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        userLongitude: PropTypes.string.isRequired,
        userLatitude: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        dateCreated: PropTypes.number.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.arrayOf(string).isRequired,
        comments: PropTypes.arrayOf(shape({displayName: PropTypes.string, comment: PropTypes.string})).isRequired,
    })
}