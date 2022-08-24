import "./login.scss"
import React from 'react'
import { useState } from "react"
import { useContext } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [credentials,setCredentials] = useState({
    username: undefined,
    password: undefined
  })
  
  const {user,loading,error,dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    const value =e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name] : value
    })

  }

  const handleClick = async (e)=>{
    e.preventDefault();
    // dispatch({type:"LOGIN_START"})
    console.log("when submit",credentials)
   try{
    const res= await axios.post("/auth/login",credentials);
    console.log("res is",res) 
    //admin annel mathram localstorageil keriyathi and home pageillek povam
    console.log("dmin",res.data.isAdmin)
    if(res.data.isAdmin){
      dispatch({type:"LOGIN_SUCCESS", payload: res.data.details});  //only otherDetails store cheyathathi localstoragil isadmin venda
      navigate("/")

    }else{
      dispatch({type:"LOGIN_FAILURE",payload: {message:"You are not allowed"} })
    }

   }
  catch(err){
    dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
  }

  }
  console.log("user is",user)

  return (
    <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4">

              <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
              <p className="text-white-50">Please enter your login and password!</p>
              <p className=" bg-danger text-white" >{error && <span>{error.message}</span>}</p>

              <div className="form-outline form-white mb-4">
                <input type="text" name="username" onChange={handleChange} id="typeEmailX" className="form-control form-control-lg" />
                <label className="form-label" >UserName</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" name="password" onChange={handleChange} id="typePasswordX" className="form-control form-control-lg" />
                <label className="form-label" >Password</label>
              </div>

              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

              <button disabled={loading} className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleClick}>Login</button>

              <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
              </div>

            </div>

            <div>
              <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
  )
}

export default Login