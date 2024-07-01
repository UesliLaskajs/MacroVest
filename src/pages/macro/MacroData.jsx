import { useState, useEffect } from "react";
import axios from "axios";

function MacroData() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/data-pair")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section>
      <div>
        {Object.keys(data).map((pair) => (
          <div key={pair}>
            <h2>{pair}</h2>
            {data[pair].map((item, index) => (
              <div key={index}>
                <h3>{item.Indicator}</h3>
                <p>Last: {item.Last}</p>
                <p>Previous: {item.Previous}</p>
                <p>Highest: {item.Highest}</p>
                <p>Lowest: {item.Lowest}</p>
                <p>Unit: {item.Unit}</p>
                <p>Date: {item.Date}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default MacroData;
