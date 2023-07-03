import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="Layout">
      <nav>
        <ul>
          <li>
            <Link to="/employees">Employees</Link>
            <Link to="/equipment">Equipment</Link>
          </li>
          <li>
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>
            <Link to="/createequipment">
              <button type="button">Create Equipment</button>
              </Link>
              <Link to="/createCompany">
              <button type="button">Create Company</button>
              </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
    )
  };

export default Layout;
