

export default function Photo({ imageSrc }) {
    return (
        <img alt='' src={imageSrc} className="object-contain h-full w-full hover:cursor-pointer"/>  
    )
}