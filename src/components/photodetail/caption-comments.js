import { Link } from "react-router-dom"

export default function CaptionAndComments({caption, comments, username}) {
    return (
            <div className="items-center flex-auto">
                <Link to={`/p/${username}`} className='flex items-center px-4 py-4'>
                    <img className="rounded-full h-10 w-10 flex mr-2 object-cover"
                        src={`/images/avatars/${username}.jpg`}
                        alt={`${username} profile`}
                    />
                    <p className="font-semibold text-lg">{username}</p>
                    <p className="ml-2 text-lg">{caption}</p>
                </Link>
                {comments.map(comment => 
                    <Link key={comment.caption} to={`/p/${comment.displayName}`} className='flex items-center px-4 py-4'>
                        <img className="rounded-full h-10 w-10 flex mr-2 object-cover"
                            src={`/images/avatars/${comment.displayName}.jpg`}
                            alt={`${comment.displayName} profile`}
                            onError={(e) => {
                        e.target.src = '/images/avatars/default.png';
                    }}
                        />
                        <p className="font-semibold text-lg">{comment.displayName}</p>
                        
                        <p className="ml-2 text-lg">{comment.comment}</p>
                    </Link>    
                )}
            </div>
    ) 
}