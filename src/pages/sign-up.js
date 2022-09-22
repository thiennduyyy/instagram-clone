import { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUserNameExist } from '../services/firebase'

export default function SignUp() {
    const navigate = useNavigate()
    const { firebase } = useContext(FirebaseContext)
    const [emailAddress, setEmailAddress] = useState('')
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isInvalid = password === '' || emailAddress === ''
    const handleSignUp = async (e) => {
        e.preventDefault()
        const userNameExist = await doesUserNameExist(userName)
        if (!userNameExist) {
            try {
                const createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress, password)
                await createdUserResult.user.updateProfile({
                    displayName: userName
                })
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                })
                console.log('done')
                navigate(ROUTES.LOGIN)
            } catch (err) {
                setFullName()
                setEmailAddress()
                setPassword()
                setError(err.messasage)
            }
        } else {
            setUserName('')
            setError('This username already exist, please try another.')
        }
        }
        
        useEffect(() => {
        document.title = 'Login - Instagram'
    }, [])
    return (
        <div className='container flex mx-auto max-w-desktop items-center h-screen'>
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col items-center bg-white p-4 border border-gray-primary'>
                    <h1 className='flex justify-center w-full'>
                        <img src='/images/logo.png' alt='Instagram' className='mt-2 w-6/12 mb-4'></img>
                    </h1>
                    {error && <p className='mb-4 text-xs text-red-primary text-red'>{error}</p>}
                    <form onSubmit={handleSignUp} method='POST'>
                        <input 
                        aria-label='Enter your user name' 
                        type='text' 
                        placeholder='User name' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={e => setUserName(e.target.value)}
                        value={userName || ""}
                        />
                        <input 
                        aria-label='Enter your full name' 
                        type='text' 
                        placeholder='Full name' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={e => setFullName(e.target.value)}
                        value={fullName || ""}
                        />
                        <input 
                        aria-label='Enter your email address' 
                        type='text' 
                        placeholder='Email address' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={e => setEmailAddress(e.target.value)}
                        value={emailAddress || ""}
                        />
                        <input 
                        aria-label='Enter your password' 
                        type='password' 
                        placeholder='Password' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        onChange={e => setPassword(e.target.value)}
                        value={password || ""}
                        />
                        <button
                        disabled={isInvalid}
                        type='submit'
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                        ${isInvalid && 'opacity-50'}`}
                        >Sign-up</button>
                    </form>
                    <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary mt-2'>
                        <p className='text-sm'>
                            Already have an account?{` `}
                            <Link to={`/login`} className='font-bold text-blue-medium'>Log-in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}