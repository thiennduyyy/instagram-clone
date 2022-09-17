import PropTypes, { func } from 'prop-types'
import Header from './header'
import { useReducer, useEffect } from 'react'
import { getUserByUsername, getUserPhotosByUserId } from '../../services/firebase'
import Photos from './photos'

export default function UserProfile({ user }) {
    const reducer = (state, newState) => ({...state, ...newState})
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    }
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUserId(user.userId)
            dispatch({profile: user, photosCollection: photos, followerCount: user.followers.length})
        }
        console.log(profile)
        getProfileInfoAndPhotos()
    }, [user.username])

    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photosCollection={photosCollection}/>
        </>
    )
}