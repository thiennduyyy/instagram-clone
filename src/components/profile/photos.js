import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"
import PhotoDetail from '../photodetail'
import SinglePhoto from './singlephotos'


export default function Photos({ photosCollection }) {
    
    return (
        <div className='border-t border-gray-primary mt-12 pt-4'>
            <div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
                {!photosCollection ? <Skeleton count={12} width={400} height={400} /> : photosCollection.length > 0 ? (
                    photosCollection.map((photo) => (
                        <SinglePhoto key={photo.docId} photo={photo}/>
                    ))
                ) : null}
                {/* <PhotoDetail content={photosCollection[0]}/> */}
            </div>
            {!photosCollection || (photosCollection.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
        </div>
    )
}

Photos.propTypes = {
    photosCollection: PropTypes.array
}