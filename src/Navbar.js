import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  return (
    <div className="flex justify-between bg-[#1d3557] p-4 ">
      <button
        onClick={() => navigate("/signin")}
        className="bg-[#fff] p-1 text-xl font-bold text-[#1d3557] rounded-lg"
      >
        Sign In
      </button>
      <p className="text-3xl text-[#fff] text-center font-bold">
        Track your activities here
      </p>
      <button
        onClick={() => navigate("/signup")}
        className="bg-[#fff] p-1 text-xl font-bold text-[#1d3557] rounded-lg"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Navbar;
