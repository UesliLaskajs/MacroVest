import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// eslint-disable-next-line react/prop-types
function CurrencyLineChart({ data }) {
  const filteredYears = (startYear, endYear) => {
    const filteredData = Object.keys(data).reduce((result, date) => {
      const currentDate = new Date(date);
      const year = currentDate.getFullYear();
      if (year >= startYear && year <= endYear) {
        const monthDay = `${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;
        if (!result[monthDay]) {
          result[monthDay] = [];
        }
        // eslint-disable-next-line react/prop-types
        result[monthDay].push(parseFloat(data[date]["4. close"]));
      }
      return result;
    }, {});

    const averagedData = Object.keys(filteredData).reduce(
      (result, monthDay) => {
        const averageClose =
          filteredData[monthDay].reduce((sum, close) => sum + close, 0) /
          filteredData[monthDay].length;
        const [month, day] = monthDay.split("-");
        const formattedDate = `${new Date().getFullYear()}-${month.padStart(
          2,
          "0"
        )}-${day.padStart(2, "0")}`;
        result[formattedDate] = averageClose.toFixed(4); 
        return result;
      },
      {}
    );

    return averagedData;
  };

  const averagedData3Years = filteredYears(2022, 2024);
  const averagedData5Years = filteredYears(2020, 2024);
  const averagedData10Years = filteredYears(2016, 2024);

  console.log(averagedData3Years);
  console.log(averagedData5Years);
  console.log(averagedData10Years);

  return (
    <LineChart
      width={1300}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="right" type="monotone" dataKey="uv" stroke="red" />
      <Line yAxisId="right" type="monotone" dataKey="amt" stroke="#82ca9d" />
    </LineChart>
  );
}

export default CurrencyLineChart;
