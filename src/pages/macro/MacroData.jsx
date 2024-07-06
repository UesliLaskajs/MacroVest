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



  return (
    <section>
      <GridMacroData data={data} index={0} />
      <hr />
      <GridMacroData data={data} index={1} />
    </section>
  );
}

export default MacroData;
