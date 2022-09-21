import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { memo } from 'react'
import "react-loading-skeleton/dist/skeleton.css"

function User({username, fullName}) {
    return (!username || !fullName ? 
        <Skeleton count={1} height={61} highlightColor="#fff"/>
     : (
        <div className='flex flex-row items-center align-items justify-between mb-4'>
            <div className='flex items-center justify-between'>
                <img className='rounded-full w-14 h-14 flex mr-3 object-cover'
                    src={`/images/avatars/${username}.jpg`}
                    onError={(e) => {
                        e.target.src = '/images/avatars/default.png';
                    }}
                    alt=''
                />
                <Link to={`/p/${username}`}>
                    <p className='font-semibold text-sm'>{username}</p>
                    <p className='text-sm text-gray-text'>{fullName}</p>
                </Link>
            </div>
            <div>
                <button className='text-xs font-semibold text-blue-medium'
                    type='button'
                >
                    Switch
                </button>
            </div>
        </div>
        // <>
        //     <Link to={`/p/${username}`} className='flex grid grid-cols-5 gap-4 mb-6 items-center'>
        //         <div className='flex items-center justify-between col-span-1'>
        //             <img className='rounded-full w-12 h-12 flex object-cover'
        //                 src={`/images/avatars/${username}.jpg`}
        //             alt=''    
        //             />

        //         </div>
        //         <div className='col-span-4'>
        //             <p className='font-semibold text-sm'>{username}</p>
        //             <p className='text-sm text-gray-text'>{fullName}</p>
        //         </div>
        //     <p>Switch</p>
        //     </Link>
        // </>
    ))
}
User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
}
export default memo(User)