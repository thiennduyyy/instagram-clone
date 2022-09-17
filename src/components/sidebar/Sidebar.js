import useUser from "../../hooks/use-user"
import Suggestions from "./suggestions"
import User from "./user"

export default function Sidebar() {
    const { user: {fullName, username, userId, following, docId }} = useUser()
    console.log(fullName, username, userId, following)
    return (
        <div className="px-4">
            <User username={username} fullName={fullName}/>
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    )
}