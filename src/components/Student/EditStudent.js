import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Student.css";
import { format } from "date-fns";
import Header from "../Common/Header";
const EditStudent = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getStudentApi = "https://student-management-system-tim.onrender.com/api/students";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(getStudentApi.concat("/") + id)
      .then((item) => {
        item.data.data.dateOfBirth = format(new Date(item.data.data.dateOfBirth), 'yyyy-MM-dd')
        setUser(item.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    debugger;
    setIsLoading(true);
    const params = {
      "id": 0,
      "email": user.email,
      "name": user.name,
      "dateOfBirth": format(new Date(user.dateOfBirth), 'yyyy-MM-dd'),
      "age": user.age
    }
    await axios.put(getStudentApi.concat("/") + id, params).then((response) => {

      var res = response.data;
      if (res) {
        debugger;
        const data = res.data;
        setUser(data);
        navigate('/show-student');
        setIsLoading(false);
      }
    }).catch((error => {
      setIsLoading(false);
      setError(error)
    }))
  };

  return (
    <div>  <Header/>
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="pwd" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={user.age}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="pwd" className="form-label">
            Date Of Birth
          </label>
          <input
            type="text"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
    </div>
  );
};
export default EditStudent;
