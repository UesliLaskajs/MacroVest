/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

function CurrencyLineChart({ data }) {
  const startDate = new Date('2024-01-01');

  const filteredYears = (startYear, endYear) => {
    const filteredData = Object.keys(data).reduce((result, date) => {
      const currentDate = new Date(date);
      const year = currentDate.getFullYear();
      if (year >= startYear && year <= endYear) {
        const monthDay = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        if (!result[monthDay]) {
          result[monthDay] = [];
        }
        result[monthDay].push(parseFloat(data[date]['4. close']));
      }
      return result;
    }, {});

    const averagedData = Object.keys(filteredData).reduce((result, monthDay) => {
      const averageClose =
        filteredData[monthDay].reduce((sum, close) => sum + close, 0) /
        filteredData[monthDay].length;
      const [month, day] = monthDay.split('-');
      const formattedDate = `${new Date().getFullYear()}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      result.push({ date: formattedDate, close: averageClose.toFixed(4) });
      return result;
    }, []);

    return averagedData.filter(entry => new Date(entry.date) >= startDate);
  };

  const averagedData3Years = filteredYears(2021, 2023);
  const averagedData5Years = filteredYears(2018, 2020);
  const averagedData10Years = filteredYears(2016, 2019);

  // Ensure combined data is aligned by date
  const combinedData = averagedData3Years.map((entry) => {
    const date = entry.date;
    return {
      date,
      '3YearAvg': entry.close,
      '5YearAvg': averagedData5Years.find(e => e.date === date)?.close || null,
      '10YearAvg': averagedData10Years.find(e => e.date === date)?.close || null,
    };
  });

  // Custom Tooltip
  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <p className="label">{`Date: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.stroke }}>{`${entry.name}: ${entry.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        data={combinedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
        <YAxis domain={[1.0, 1.2]} tick={{ fontSize: 12 }} tickMargin={10} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px' }} />
        <Line type="monotone" dataKey="3YearAvg" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 2 }} />
        <Line type="monotone" dataKey="5YearAvg" stroke="red" strokeWidth={2} dot={{ stroke: 'red', strokeWidth: 2 }} />
        <Line type="monotone" dataKey="10YearAvg" stroke="#82ca9d" strokeWidth={2} dot={{ stroke: '#82ca9d', strokeWidth: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

CurrencyLineChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CurrencyLineChart;
