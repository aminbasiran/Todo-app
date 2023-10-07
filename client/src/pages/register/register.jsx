import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"
import {Link} from "react-router-dom"

const validationSchema = yup.object({
    username:yup.string().required("Required"),
    password:yup.string().required("Required"),
    email:yup.string().required("Required")
})

function Register() {

    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:""
        },
        onSubmit:(values,{ resetForm }) =>{
            console.log(values)
            axios.post("http://localhost:3001/v1/api/users/register",values)
            .then(response=>{
                console.log(response.data)
                resetForm()
            })
            .catch(err=>{
                console.error(err)
                setError("An error occured while posting data.")
            })
        },
        validationSchema

    })
    
    return ( 
        <>
            <div className="register">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" {...formik.getFieldProps("username")}/>
                    {formik.errors.username && formik.touched.username ? <div>{formik.errors.username}</div>:null}
                    <br/>
                    <br/>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" {...formik.getFieldProps("email")}/>
                    {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div>:null}
                    <br/>
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" {...formik.getFieldProps("password")} autoComplete="on"/>
                    {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div>:null}
                    <br/>
                    <br/>
                    <input type="submit" />
                </form>
            </div>
            <Link to="/signin">Already have an account? Click here</Link>
        </>
    );
}

export default Register