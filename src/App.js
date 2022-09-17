import { seedDatabase } from './seed';
import { useEffect, cloneElement } from 'react'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import Login from './pages/login';
import * as ROUTES from './constants/routes'
import UserContext from './context/user';
import { firebase } from './lib/firebase';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-routes';
import Profile from './pages/profile';
const Login = lazy(() => import ('./pages/login'))
const SignUp = lazy(() => import ('./pages/sign-up'))
const NotFound = lazy(() => import ('./pages/not-found'))
const Dashboard = lazy(() => import ('./pages/dashboard'))

function App() {
  const { user } = useAuthListener()
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading ...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login/>}/>
            <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>
            {/* <Route path={ROUTES.DASHBOARD} element={<Dashboard/>}/> */}
            <Route
              path={ROUTES.DASHBOARD}
              element={!!user ? <Dashboard/> 
              : <Navigate to={{ pathname: ROUTES.LOGIN }}/>}
            />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound/>}/>
            <Route path={ROUTES.PROFILE} element={<Profile/>}/>
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
