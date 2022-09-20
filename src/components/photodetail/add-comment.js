
import { useContext, useState } from "react";
import PropTypes from 'prop-types'
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { NavLink } from "react-router-dom";

export default function AddComment({ docId, comments, setComments, commentInput}) {
    const [ comment, setComment ] = useState('')
    const { firebase, FieldValue } = useContext(FirebaseContext)
    const {
        user: {displayName} 
    } = useContext(UserContext)

    const handleSubmitComment = (event) => {
        event.preventDefault()
        setComments([{displayName, comment}, ...comments])
        setComment('')
        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({displayName, comment})
            })
    }
    return (
    <div className="border-t border-gray-primary py-2 mt-4">
        <form className="flex justify-between pl-0 pr-5"
            method="POST"
            onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}
        >
            <div className="flex ml-3 hover:cursor-pointer">
                <svg aria-label="Emoji" className="_ab6- h-full" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
            </div>
            <input aria-label="Add a comment"
                autoComplete="off"
                className="text-sm text-gray-base w-full focus:outline-none mr-3 py-5 px-4"
                type='text'
                name="add-comment"
                placeholder="Add a comment ..."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                ref={commentInput}
            />
            <button className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                type='button'
                disabled={comment.length < 1}
                onClick={handleSubmitComment}
            >
                Post
            </button>
        </form>
    </div>
    )
}


AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired
}