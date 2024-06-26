import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


const GlobalToasterLayout = () => {
  
    return (
        <>
            <Toaster /> 
            <Outlet /> 
        </>
    )
}

export default GlobalToasterLayout