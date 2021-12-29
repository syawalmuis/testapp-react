import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dosens from "./components/Dosens";
import Nav from "./components/Nav.js";
import Todo from "./components/Todo";
import BaseApi from "./config";
import logo from "./logo.svg";

function App() {
  const [dosens, setDosens] = useState([]);
  const apiHandler = async () => {
    const request = await fetch(`${BaseApi}/dosen`);
    const response = await request.json();
    setDosens(response);
  };

  useEffect(() => {
    // console.log(params);
    setTimeout(() => {
      apiHandler();
    }, 0);
  }, []);
  return (
    <>
      {dosens.length > 0 ? (
        <>
          <Nav />
          <div id="content" className="mb-5">
            <div className="container mt-3 mb-5">
              <Routes>
                <Route path="/" element={<Dosens dosens={dosens} />} />
                <Route path="todo" element={<Todo />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      )}
    </>
  );
}

export default App;
