import { Link } from "react-router-dom";
import { Home } from "../Pages/Home";
import { FetchOld } from "../Pages/FetchOld";
import { FetchRq } from "../Pages/FetchRq";

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Logo / Title */}
        <h1 className="text-xl font-bold">My App</h1>

        {/* Nav Links */}
        <div className="flex gap-6">
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/Fetch-Old"
            className="hover:text-yellow-400 transition duration-200"
          >
            Fetch Old
          </Link>
          <Link
            to="/Fetch-RQ"
            className="hover:text-yellow-400 transition duration-200"
          >
            Fetch RQ
          </Link>
        </div>

      </div>
    </nav>
  );
};