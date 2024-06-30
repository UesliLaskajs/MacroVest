import "./scss/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import MacroData from "./pages/macro/MacroData";
import Seasonal from "./pages/seasonal/Seasonal";
import Navbar from "./Layout/Navbar";
import MarketSentiment from "./pages/market_sentiment/MarketSentiment";
import BankReport from "./pages/BankReport/BankReport";
import Testing from "./pages/test/Testing";
function App() {
  return (
    <>
      <Router>
        <div className="flex-nav">
          <Navbar    />
          <Routes>
            <Route path={"/"} element={<Dashboard />} />
            <Route path="/macro-data" element={<MacroData />} />
            <Route path="/seasonality" element={<Seasonal />} />
            <Route path="/sentiment" element={<MarketSentiment />} />
            <Route path="/bank-reports" element={<BankReport />} />
            <Route path="/test" element={<Testing />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
