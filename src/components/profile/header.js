import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import Skeleton from "react-loading-skeleton"
import useUser from "../../hooks/use-user"
import "react-loading-skeleton/dist/skeleton.css"
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase"


export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
      docId: profileDocId,
      userId: profileUserId,
      fullName,
      followers,
      following,
      username: profileUsername
}}) {
    const [isFollowingProfile, setIsFollowingProfile] = useState(null)
    const { user } = useUser()
    console.log(user)
    const activeBtnFollow = user.username && user.username !== profileUsername
    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
    }
    console.log(followerCount)
    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId)
            setIsFollowingProfile(!!isFollowing)
        }
        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user?.username, profileUserId]);
    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                {profileUsername && (<img  className="rounded-full h-40 w-40 object-cover flex"
                    alt={`${profileUsername} profile avatar`}
                    src={`/images/avatars/${profileUsername}.jpg`}
                    onError={(e) => {
                        e.target.src = '/images/avatars/default.png';
                    }}
                />)}
            </div>
            <div className="flex items-center justify-between flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-3xl font-light mr-4">{profileUsername}</p>
                    {activeBtnFollow ? (
                    <>
                        <button
                            className={isFollowingProfile ? "bg-blue-medium font-medium text-sm rounded text-white w-24 h-8" : "bg-white-medium font-medium text-sm border-border-gray border rounded text-black w-24 h-8"}
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleToggleFollow()
                                }
                            }}
                        >   
                            {isFollowingProfile ? 'Following' : 'Follow'}
                        </button>
                        <button
                            className="bg-white-medium font-medium text-sm border-border-gray border rounded text-black w-24 h-8 ml-4"
                            type="button"
                        >
                            Message
                        </button>
                        <svg aria-label="Options" class="_ab6- ml-4 hover:cursor-pointer" color="#262626" fill="#262626" height="32" role="img" viewBox="0 0 24 24" width="32"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </>
                    ) : <button
                            className="bg-white-medium font-medium text-sm border-border-gray border rounded text-black w-24 h-8 ml-4"
                            type="button"
                        >
                            Edit profile
                        </button>}
                </div>
                <div className="container flex mt-4">
                    {!followers || !following ? (
                    <Skeleton count={1} width={677} height={24}/>
                    ): (
                        <>
                            <p className="mr-10 text-medium">
                                <span className="font-bold">{photosCount}</span>
                                {` `}
                                {photosCount === (0 || 1) ? 'post' : 'posts' }
                            </p>
                            <p className="mr-10 text-medium">
                                <span className="font-bold">{followerCount}</span>
                                {` `}
                                {followerCount === 1 ? 'follower' : 'followers'}
                            </p>
                            <p className="mr-10 text-medium">
                                <span className="font-bold">{following.length}</span>
                                {` `}
                                following
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium text-medium">{!fullName ? <Skeleton count={1} height={24}/> : fullName}</p>
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired
}