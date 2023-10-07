import { useFormik } from "formik";
// import { useState } from "react";
import * as yup from "yup"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
    username:yup.string().required("Required"),
    password:yup.string().required("Required")
})


function Signin() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            username:"",
            password:""
        },
        onSubmit:(values,{resetForm})=>{
            axios.post("http://localhost:3001/v1/api/users/signin",values)
            .then(response=>{
                localStorage.setItem('token',response.data.token)
                resetForm()
                console.log(localStorage)
                navigate("/")
            })
        },
        validationSchema
    })

    return ( 

        <>
            <div className="signin">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" {...formik.getFieldProps("username")}/>
                    {formik.errors.username && <div>{formik.errors.username}</div>}
                    <br/>
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" autoComplete="off"{...formik.getFieldProps("password")}/>
                    {formik.errors.password && <div>{formik.errors.password}</div>}
                    <br/>
                    <br/>
                    <input type="submit" />
                </form>
            </div>
            <Link to="/register">Don't have an account? Click here</Link>
        </>
    );
}

export default Signin;