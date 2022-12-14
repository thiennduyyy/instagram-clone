import PropTypes from 'prop-types'
import { useState, useEffect } from "react"
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profile'
import "react-loading-skeleton/dist/skeleton.css"

export default function Suggestions({ userId, following, loggedInUserDocId }) {
    console.log(userId, following)
    const [profiles, setProfiles] = useState(null)
    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following)
            setProfiles(response)
        }
        if (userId) {
            console.log('userId', userId)
            suggestedProfiles()
        }
    }, [userId, following])

    return (!profiles ? (
        <Skeleton count={1} height={150} className='mt-5'/>
    ) :  profiles.length > 0 ?(
        <div className='rounded flex flex-col'>
            <div className='text-sm flex items-center align-items justify-between mb-2'>
                <p className='font-medium text-gray-text'>Suggestions for you</p>
                <p className='font-medium text-xs text-black-primary hover:cursor-pointer'>See all</p>
            </div>
            <div className='mt-4 grid ap-5'>
                {profiles.map((profile) => (
                    <SuggestedProfile 
                        key={profile.docId}
                        profileDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                ))}
            </div>
        </div>
    ) : null)
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
}