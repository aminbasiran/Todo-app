import {Link} from "react-router-dom"

function Landing() {
    return (  <>
    
        <div>Landing page</div>
        <Link to="/register">Register</Link>
        <Link to="/signin">Sign in</Link>
    
    </>);
}

export default Landing;