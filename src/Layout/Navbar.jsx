// MyComponent.jsx
import  { useState,  useMemo } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
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

function Navbar() {
  const location = useLocation();

  const currencyPairs = useMemo(
    () => [
      { pair: "EUR/USD", name: "euro-area / united-states" },
      { pair: "USD/JPY", name: "united-states / japan" },
      { pair: "GBP/USD", name: "united-kingdom / united-states" },
      { pair: "AUD/USD", name: "australia / united-states" },
      { pair: "USD/CAD", name: "united-states / canadian" },
      { pair: "USD/CHF", name: "united-states / switzerland" },
      { pair: "NZD/USD", name: "new-zealand / united-states" },
      { pair: "EUR/GBP", name: "euro-area / united-kingdom" },
      { pair: "EUR/JPY", name: "euro-area / japan" },
      { pair: "EUR/CHF", name: "euro-area / switzerland" },
      { pair: "GBP/JPY", name: "united-kingdom / japan" },
      { pair: "AUD/JPY", name: "australia / japan" },
      { pair: "AUD/CHF", name: "australia / switzerland" },
      { pair: "NZD/JPY", name: "new-zealand / japan" },
      { pair: "NZD/CHF", name: "new-zealand / switzerland" },
    ],
    []
  );

  const [selectedPair, setSelectedPair] = useState(currencyPairs[0].name);

  const selectHandler = async (e) => {
    const newPair = e.target.value;
    setSelectedPair(newPair);

    try {
      await axios.post('http://localhost:3001/update-pair', { selectedPair: newPair });
      console.log('Selected pair sent to server');
    } catch (error) {
      console.error('Error sending selected pair to server:', error);
    }
  };

  const isActiveLink = (path) => location.pathname === path ? "active-link" : "";

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
                  <option key={item.name} value={item.name}>
                    {item.pair}
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
