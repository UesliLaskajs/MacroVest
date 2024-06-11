import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const location = useLocation();
  return (
    <>
      <section className="nav-container">
        <div className="side-navbar">
          <div className="navbar-strategy_items">
            <div className="nav-logo">
              {/* <img src="" /> To have a Logo */}
              <h1>MacroVest</h1>
            </div>

            <div className="strategy_items">
            <div className={`menu-item ${location.pathname === '/' ? 'active-link' : ''}`}>
                <FontAwesomeIcon icon={faChartLine} />
                <Link to="/">Dashboard</Link>
              </div>
              <div className={`menu-item ${location.pathname === '/macro-data' ? 'active-link' : ''}`}>
                <FontAwesomeIcon icon={faDatabase} />
                <Link to="/macro-data">Macro Data</Link>
              </div>
              <div className={`menu-item ${location.pathname === '/seasonality' ? 'active-link' : ''}`}>
                <FontAwesomeIcon icon={faChartSimple} />
                <Link to="/seasonality">Seasonality</Link>
              </div>
              <div className={`menu-item ${location.pathname === '/sentiment' ? 'active-link' : ''}`}>
                <FontAwesomeIcon icon={faPercent} />
                <Link to="/sentiment">Sentiment</Link>
              </div>
              <div className={`menu-item ${location.pathname === '/bank-reports' ? 'active-link' : ''}`}>
                <FontAwesomeIcon icon={faBuildingColumns} />
                <Link to="/bank-reports">Bank Report</Link>
              </div>
            </div>
          </div>

          <div className="settings">
            {/* <div className="color_change-button">
              <button>Color</button>
            </div> */}
            <div className="log-out">
              <button> <FontAwesomeIcon icon={faSignOut} />Logout</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Navbar;
