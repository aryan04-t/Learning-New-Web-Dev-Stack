import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

import GlobalToasterLayout from '../layouts/GlobalToasterLayout.jsx'

import Home from '../components/Home.jsx' 
import AddFruit from '../components/AddFruit.jsx' 
import DisplayFruits from '../components/DisplayFruits.jsx' 


const Routing = () => {

    return(
        <Router>
            <Routes>
                <Route element={ <GlobalToasterLayout /> }>
                    <Route path={'/'} element={ <Home /> } />
                    <Route path={'/add-fruit'} element={ <AddFruit /> } />
                </Route>
            </Routes>
        </Router>
    )
}

export default Routing; 