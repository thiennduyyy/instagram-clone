import PropTypes from 'prop-types'

export default function Image({ src, caption, handleToggleLiked}) {
    return <img src={src} alt={caption} className='w-full object-cover' onDoubleClick={(event) => handleToggleLiked()}/>
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}