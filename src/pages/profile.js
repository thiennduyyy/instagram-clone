import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from '../constants/routes'
import Header from "../components/Header";
import UserProfile from "../components/profile";

export default function Profile() {
    const { username } = useParams()
    const [user, setUser] = useState()
    const navigate = useNavigate()
    console.log(user)
    useEffect(() => {
        async function checkUserExists() {
          const [user] = await getUserByUsername(username);
          if (user?.userId) {
            setUser(user);
          } else {
            navigate(ROUTES.NOT_FOUND)
          }
        }
    
        checkUserExists();
      }, [username]);
    return user?.username ? (
        <div className="bg-gray-background">
          <Header />
          <div className="mx-auto max-w-screen-lg">
            <UserProfile user={user} />
          </div>
        </div>
      ) : null;
}