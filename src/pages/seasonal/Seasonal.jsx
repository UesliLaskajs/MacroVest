import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyLineChart from "../../components/SeasonalData";

function Seasonal() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=full&apikey=demo"
      )
      .then((response) => {
        if (response.data && response.data['Time Series FX (Daily)']) {
          setData(response.data['Time Series FX (Daily)']);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(Object.keys(data))
  return (
    <div style={{ width: "100%", height: "100vh" }}> {/* Full width and height */}
      <CurrencyLineChart data={data} />
    </div>
  );
}

export default Seasonal;
