import React from 'react'
import "./signup.css"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Signup() {
    const [credentials,setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined
      })

    const [error,setError]=useState(false);

    const navigate=useNavigate();


  const handleChange = (e) =>{
    const value =e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name] : value
    })

  }

  const handleClick = async (e)=>{
    e.preventDefault();
    
    console.log("when submit",credentials)
   try{
    const res= await axios.post("http://localhost:8800/api/auth/register",credentials);
    console.log("res is",res)
    navigate("/login")
    

   }
  catch(err){
    console.log(err)
    setError(err.response.data)
  }
}

  return (
    <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4">

              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className=" bg-danger text-white" >{error && <span>{error.message}</span>}</p>

              <div className="form-outline form-white mb-4">
                <input type="text" name="username" onChange={handleChange} id="typeEmailX" className="form-control form-control-lg" />
                <label className="form-label" >UserName</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="email" name="email" onChange={handleChange} id="" className="form-control form-control-lg" />
                <label className="form-label" >email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" name="password" onChange={handleChange} id="typePasswordX" className="form-control form-control-lg" />
                <label className="form-label" >Password</label>
              </div>

              <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleClick}>Register</button>

              <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Signup