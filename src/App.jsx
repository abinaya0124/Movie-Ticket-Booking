import Login from "./Components/Login";
import Booking from "./Components/Booking";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </div>
  );
};

export default App;
