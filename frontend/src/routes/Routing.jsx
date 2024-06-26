import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

import Home from '../components/Home.jsx' 
import Write from '../components/Write.jsx' 


const Routing = () => {

    return(
        <Router>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/write'} element={<Write />} />
            </Routes>
        </Router>
    )
}

export default Routing; 