import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
  const {user,dispatch}=useContext(AuthContext)
  const navigate=useNavigate()

  const handleClick = () =>{
    dispatch({type:"LOGOUT"})
    navigate("/")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">lamabooking</span>
        </Link>
       {user ? <div className="navItems">
       <span className="text-white  p-2 mb-1 border border-primary rounded">{user.username}</span>
          <button className="navButton border border-primary rounded" onClick={handleClick}>Logout</button>
        </div>
           : <div className="navItems">
          <Link to="/signup">
          <button className="navButton">Register</button>
          </Link>
          <Link to="/login">
          <button className="navButton">Login</button>
          </Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar