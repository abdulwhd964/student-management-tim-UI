import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import { format } from 'date-fns';
import Header from "../Common/Header";

const ShowStudent = () => {
  const showStudentApi = "https://student-management-system-tim.onrender.com/api/students";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handelDelete = async (id) => {
    console.log("id : -", id);
    await axios.delete(showStudentApi.concat("/") + id).then((response) => {
      var res = response.data;
      debugger
      if (res==='') {
        debugger;
        setUser(user.filter((item) => item.id !== id));
       // navigate('/show-student');
      }
    }).catch((error => {
      setIsLoading(false);
      setError(error)
    }))


    // try {
    //   const response = await fetch(showStudentApi.concat("/") + id, {
    //     method: "DELETE",
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to delete item");
    //   }
    //   setUser(user.filter((item) => item.id !== id));
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    setIsLoading(true);
    axios
      .get(showStudentApi)
      .then((res) => {
        debugger
        console.log(res)
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setIsLoading(false);
  };

  if (user.length === 0) {
    return <div>  <Header/> <br/><h1>no Student found</h1> </div>;
  } else {
    return (
      <div>  <Header/>
      <div className="mt-5">
      <table className="react-table">
        <thead>
          <tr>
          <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Date Of Birth</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {user?.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                  <td>{format(new Date(item.dateOfBirth),'yyyy-MM-dd')}</td>
                  <td>
                    <Link to={`/edit-student/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/student/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
     </div>
    );
  }
};

export default ShowStudent;
