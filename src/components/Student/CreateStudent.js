import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import axios from "axios";
import './Student.css';
import Header from '../Common/Header';
import API_URL from '../Api';
const CreateStudent = () => {
    const navigate = useNavigate();
    const createStudentApi = API_URL+"/students";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        age: "",
        dateOfBirth:""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(user)
        const params= {
            "name":user.name,
            "email":user.email,
            "age":user.age,
            "dateOfBirth":user.dateOfBirth
        }
        await axios.post(createStudentApi,params).then((response)=>{
            
                var res = response.data;
                if(res){
                    debugger;
                    const data = res.data;
                    setUser(data);
                    navigate('/show-student');
                    setIsLoading(false);
                }
        }).catch((error=>{
            setIsLoading(false);
            setError(error)
        }))
    }

    return (
        <div>  <Header/>
        <div className='user-form'>
            <div className='heading'>
              
            {isLoading && <Loader />}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <p>Student Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Age</label>
                    <input type="text" className="form-control" id="age" name="age" value={user.age} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Date Of Birth</label>
                    <input type="text" className="form-control" id="dateOfBirth" name="dateOfBirth" value={user.dateOfBirth} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default CreateStudent
