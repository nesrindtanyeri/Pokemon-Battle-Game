import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border border-base-300 hover:bg-base-200">
   
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          Gotta Catch 'em All!
        </Link>
      </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
                        >
                            Home
                        </NavLink>
                  </li>
                  <li>
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
                        >
                            Log In
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/battle" 
                            className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
                        >
                            Battle
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/roster" 
                            className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
                        >
                            My Roster
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/leaderboard" 
                            className={({ isActive }) => isActive ? "text-primary font-bold" : ""}
                        >
                            Leaderboard
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
  ); 
}
  
export default Navbar;
