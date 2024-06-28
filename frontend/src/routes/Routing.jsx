import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

import GlobalToasterLayout from '../layouts/GlobalToasterLayout.jsx'

import Home from '../pages/Home.jsx' 
import FruitsPage from '../pages/FruitsPage.jsx' 


const Routing = () => {

    return(
        <Router>
            <Routes>
                <Route element={ <GlobalToasterLayout /> }>
                    <Route path={'/home'} element={ <Home /> } />
                    <Route path={'/fruits-page'} element={ <FruitsPage /> } />
                </Route>
            </Routes>
        </Router>
    )
}

export default Routing; 