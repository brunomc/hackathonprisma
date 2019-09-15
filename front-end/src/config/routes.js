import React from 'react'
import Home from '../views/Home/Home'
import Login from '../views/Login/Login'
import Profile from '../views/Profile/Profile'
import Hackathons from '../views/Hackathons/Hackathons'
import HackathonDetails from '../views/Hackathons/Details/HackathonDetails'
import HackathonEdit from '../views/Hackathons/Edit/HackathonEdit'
import Squads from '../views/Squads/Squads'
import Awards from '../views/Awards/Awards'
import Terms from '../views/Terms/Terms'
import Reports from '../views/Reports/Reports'
import Register from '../views/Register/Register'
import Configurations from '../views/Configurations/Configurations'
import ChangePasswordView from '../views/ChangePasswordView/ChangePasswordView'

export const routes = {
    '/login': () => <Login />,
    '/': () => <Home />,
    '/profile': () => <Profile />,
    '/hackathons': () => <Hackathons />,
    '/hackathons/details/:id': ({ id }) => <HackathonDetails id={id} />,
    '/change/password/:id': ({ id }) => <ChangePasswordView token={id} />,
    '/hackathons/edit/:id': ({ id }) => <HackathonDetails id={id} />,
    '/squads': () => <Squads />,
    '/awards': () => <Awards />,
    '/terms': () => <Terms />,
    '/configurations': () => <Configurations />,
    '/reports': () => <Reports />,
    '/register': () => <Register />,
}