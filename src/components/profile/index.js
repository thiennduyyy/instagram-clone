import PropTypes, { func } from 'prop-types'
import Header from './header'
import { useReducer, useEffect, useContext, useMemo } from 'react'
import { getUserByUsername, getUserPhotosByUserId } from '../../services/firebase'
import Photos from './photos'
import UserContext from '../../context/user'

export default function UserProfile({ user }) {
    const loggedInUser = useContext(UserContext)
    console.log(loggedInUser)
    const reducer = (state, newState) => ({...state, ...newState})
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    }
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState)
    async function getProfileInfoAndPhotos() {
        const photos = await getUserPhotosByUserId(user.userId, loggedInUser.user.uid)
        if (photos !== photosCollection) {
            dispatch({profile: user, photosCollection: photos, followerCount: user.followers.length})
        }
    }
    useEffect(() => {
        getProfileInfoAndPhotos()
    }, [user.username])
    // getProfileInfoAndPhotos()
    // useMemo(() => {
    // }, [user.username])
    console.log(photosCollection)
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