import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 border border-base-300 hover:bg-base-200">
        {/* Logo Section */}
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            Pokemon Battles
          </Link>
        </div>
    return (
        <div className="navbar bg-base-100 border border-base-300 hover:bg-base-200">
            {/* Logo Section */}
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl" to="/">Pokemon Battles</Link>
            </div>

        {/* Navigation Links */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/battle"
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }
              >
                Battle
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myRoster"
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }
              >
                My Roster
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }
              >
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
