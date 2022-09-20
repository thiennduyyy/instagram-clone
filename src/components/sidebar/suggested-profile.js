import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'
import LoggedInUserContext from '../../context/logged-in-user-context'
import { getUserByUserId } from '../../services/firebase'

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId}) {
    const [followed, setFollowed] = useState(false)
    async function handleFollowUser() {
        setFollowed(true)
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
        await updateFollowedUserFollowers(profileDocId, userId, false)
    }

    return !followed ? (
        <div className='flex flex-row items-center align-items justify-between mb-4'>
            <div className='flex items-center justify-between'>
                <img className='rounded-full w-9 h-9 flex mr-3 object-cover'
                    src={`/images/avatars/${username}.jpg`}
                    onError={(e) => {
                        e.target.src = '/images/avatars/default.png';
                    }}
                    alt=''
                />
                <Link to={`/p/${username}`}>
                    <p className='font-semibold text-base'>{username}</p>
                </Link>
            </div>
            <div>
                <button className='text-base font-semibold text-blue-medium'
                    type='button'
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        </div>
    ) : null
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
}