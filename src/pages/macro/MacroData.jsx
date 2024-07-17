import { useState, useEffect } from "react";
import axios from "axios";
import GridMacroData from "../../components/GridMacroData";
function MacroData() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/data-pair")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(data);

  return (
    <section style={{ display: "flex", width: "86%" }}>
      <GridMacroData data={data} index={0} compareIndex={1} />
      <GridMacroData data={data} index={1} compareIndex={0} />
    </section>
  );
}

export default MacroData;
