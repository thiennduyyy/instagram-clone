import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

export default function Header({ username }) {
    return (
        <div className="flex justify-between border-b-md border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className='flex items-center'>
                    <img className="rounded-full h-10 w-10 flex mr-2"
                        src={`/images/avatars/${username}.jpg`}
                        alt={`${username} profile`}
                    />
                    <p className="font-semibold">{username}</p>
                </Link>
            </div>
            <div className="flex items-center hover:cursor-pointer">
                <svg aria-label="More options" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired
}