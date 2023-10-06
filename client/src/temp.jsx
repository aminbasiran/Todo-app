import { Route, Routes} from 'react-router-dom';
import App from "./pages/App/App.jsx"
import Register from "./pages/register/register.jsx"
import Signin from "./pages/signin/signin.jsx"
// import Landing from "./pages/Landing/landing.jsx"

function temp() {
    return ( 
        <Routes>
                <Route path="/" element={<App/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/signin' element={<Signin/>}/>
        </Routes>
    );
}

export default temp;

