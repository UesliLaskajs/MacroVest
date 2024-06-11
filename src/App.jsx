import "./scss/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import MacroData from "./pages/macro/MacroData";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path="/macro-data" element={<MacroData/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
