import { Link } from "react-router-dom";
import "./navbar.scss"
function Navbar() {
  return (
    <>
      <section className="nav-container">
        <div className="side-navbar">
          <div className="navbar-strategy_items">
            <div className="nav-logo">
              <img src="" alt="Logo" />
            </div>

            <div className="strategy_items">
              <Link to="/">Dashboard</Link>
              <Link to="/macro-data">Macro Data</Link>
              <Link to="/seasonality">Seasonality</Link>
              <Link to="/sentiment">Sentiment</Link>
              <Link to="/bank-reports">Bank Reports</Link>
            </div>
          </div>

          <div className="settings">
            <div className="color_change-button">
              <button>Color</button>
            </div>

            <div className="log-out">
              <button>Log out</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Navbar;
