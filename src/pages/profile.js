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
          <div className='fixed flex h-full top-0 bottom-0 left-0 right-0 bg-black-rgba hidden'>
            <div className="flex w-3/4 h-90 bg-white m-auto">
              <div className="w-3/5 bg-black-primary">
                <img src="/images/users/leomessi/6.jpg" className="object-contain h-full w-full"/> 
              </div>
              <div className="w-2/5 bg-red-primary"></div>
            </div>
          </div>
        </div>
      ) : null;
}