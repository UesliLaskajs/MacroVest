import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyLineChart from "../../components/SeasonalData";

function Seasonal() {
  const [data, setData] = useState({});

  // const [pair, setPair] = useState({});
  

  // const stringedPair = JSON.stringify(pair);

  //   const regexSplitPairs = (stringedPair) => {
  //     return stringedPair.split(/\s*\/\s*/);
  // };

  // const [pair1,pair2]=regexSplitPairs(stringedPair);
  // console.log(pair1,pair2)

  useEffect(() => {
    axios
      .get(
        "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=AUD&outputsize=full&apikey=ND43YEOY4VBRKH71"
      )
      .then((response) => {
        if (response.data && response.data["Time Series FX (Daily)"]) {
          setData(response.data["Time Series FX (Daily)"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
1
  // console.log(Object.keys(data));
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {" "}
      {/* Full width and height */}
      <CurrencyLineChart data={data} />
    </div>
  );
}

export default Seasonal;
