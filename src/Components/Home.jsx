import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h3 className="text-xl font-bold">Please Login to proceed further</h3>
      <NavLink to="/login">
        <button
          className="bg-black text-white w-full px-32 py-2 mt-5 rounded-lg 
         hover:bg-gray-500 hover:text-black "
        >
          Login
        </button>
      </NavLink>
    </div>
  );
};

export default Home;
