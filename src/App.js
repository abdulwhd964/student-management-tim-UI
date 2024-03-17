import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Header from "./components/Common/Header";
import CreateStudent from "./components/Student/CreateStudent";
import ShowStudent from "./components/Student/ShowStudent";
import EditStudent from "./components/Student/EditStudent";
function App() {

  
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<Header />} />
            <Route path="/edit-student/:id" element={<EditStudent/>} />
            <Route path="/student/:id" element={<EditStudent />} />
            <Route path="/create-student" element={<CreateStudent />} />
            <Route path="/show-student" element={<ShowStudent />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
