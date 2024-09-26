import Chart from "./components/pages/Chart"
import { Routes, Route, Navigate } from "react-router-dom"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import NavBar from "./components/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContex";
import { ChartContextProvider } from "./context/ChartContex";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { user } = useContext(AuthContext);


  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div style={{ height: '100vh', position: 'relative' }} onMouseMove={handleMouseMove} >
        <ChartContextProvider user={user}>
          <NavBar />
          {/* <SmokeEffect position={position}
          /> */}
          <Container className="text-secondary">
            <Routes>
              <Route path="/" element={user ? <Chart /> : <Register />} />
              <Route path="/register" element={user ? <Chart /> : <Register />} />
              <Route path="/login" element={user ? <Chart /> : <Login />} />

              <Route path="*" element={<Navigate to="/" />} />

            </Routes>
          </Container>
        </ChartContextProvider>
      </div>
    </>
  )
}

export default App
