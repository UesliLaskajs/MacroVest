import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDatabase,
  faChartSimple,
  faPercent,
  faBuildingColumns,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useMemo } from "react";

function Navbar() {
  const location = useLocation();

  const currencyPairs = useMemo(
    () => [
      { pair: "EUR/USD", name: "Euro / US Dollar" },
      { pair: "USD/JPY", name: "US Dollar / Japanese Yen" },
      { pair: "GBP/USD", name: "British Pound / US Dollar" },
      { pair: "AUD/USD", name: "Australian Dollar / US Dollar" },
      { pair: "USD/CAD", name: "US Dollar / Canadian Dollar" },
      { pair: "USD/CHF", name: "US Dollar / Swiss Franc" },
      { pair: "NZD/USD", name: "New Zealand Dollar / US Dollar" },
      { pair: "EUR/GBP", name: "Euro / British Pound" },
      { pair: "EUR/JPY", name: "Euro / Japanese Yen" },
      { pair: "EUR/CHF", name: "Euro / Swiss Franc" },
      { pair: "GBP/JPY", name: "British Pound / Japanese Yen" },
      { pair: "AUD/JPY", name: "Australian Dollar / Japanese Yen" },
      { pair: "AUD/CHF", name: "Australian Dollar / Swiss Franc" },
      { pair: "NZD/JPY", name: "New Zealand Dollar / Japanese Yen" },
      { pair: "NZD/CHF", name: "New Zealand Dollar / Swiss Franc" },
      { pair: "CAD/JPY", name: "Canadian Dollar / Japanese Yen" },
      { pair: "CAD/CHF", name: "Canadian Dollar / Swiss Franc" },
    ],
    []
  );

  const [selectedPair, setSelectedPair] = useState(currencyPairs[0].pair);

  const selectHandler = (e) => {
    setSelectedPair(e.target.value);
    console.log(e.target.value); // Log the selected value directly from the event
  };

  const isActiveLink = (path) =>
    location.pathname === path ? "active-link" : "";

  return (
    <section className="nav-container">
      <div className="side-navbar">
        <div className="navbar-strategy_items">
          <div className="nav-logo">
            
            <h1>MacroVest</h1>
          </div>

          <div className="strategy_items">
            <div className={`menu-item ${isActiveLink("/")}`}>
              <FontAwesomeIcon icon={faChartLine} />
              <Link to="/">Dashboard</Link>
            </div>
            <div className={`menu-item ${isActiveLink("/macro-data")}`}>
              <FontAwesomeIcon icon={faDatabase} />
              <Link to="/macro-data">Macro Data</Link>
            </div>
            <div className={`menu-item ${isActiveLink("/seasonality")}`}>
              <FontAwesomeIcon icon={faChartSimple} />
              <Link to="/seasonality">Seasonality</Link>
            </div>
            <div className={`menu-item ${isActiveLink("/sentiment")}`}>
              <FontAwesomeIcon icon={faPercent} />
              <Link to="/sentiment">Sentiment</Link>
            </div>
            <div className={`menu-item ${isActiveLink("/bank-reports")}`}>
              <FontAwesomeIcon icon={faBuildingColumns} />
              <Link to="/bank-reports">Bank Reports</Link>
            </div>

            <div className="menu-item select-item">
              <label htmlFor="currency">Select Pair:</label>
              <select
                id="currency"
                value={selectedPair}
                onChange={selectHandler}
              >
                {currencyPairs.map((item) => (
                  <option key={item.pair} value={item.pair}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="settings">
          <div className="log-out">
            <button>
              <FontAwesomeIcon icon={faSignOut} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
