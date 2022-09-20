import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { memo } from 'react'
import "react-loading-skeleton/dist/skeleton.css"

function User({username, fullName}) {
    return (!username || !fullName ? 
        <Skeleton count={1} height={61} highlightColor="#fff"/>
     : (
        <Link to={`/p/${username}`} className='grid grid-cols-5 gap-4 mb-6 items-center'>
            <div className='flex items-center justify-between col-span-1'>
                <img className='rounded-full w-12 h-12 flex object-cover'
                    src={`/images/avatars/${username}.jpg`}
                alt=''    
                />

            </div>
            <div className='col-span-4'>
                <p className='font-semibold text-sm'>{username}</p>
                <p className='text-sm text-gray-text'>{fullName}</p>
            </div>
        </Link>
    ))
}
User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
}
export default memo(User)