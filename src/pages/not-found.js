import { useEffect } from "react"

export default function NotFound() {
    useEffect(() => {
        document.title = 'Not found!'
    }, [])
    return (
        <div className="bg-gray-background">
            <div className="mx-auth max-w-sreen-lg">
                <p className="text-center text-2xl">Not found!</p>
            </div>
        </div>
    )
}