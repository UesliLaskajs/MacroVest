/* eslint-disable react/prop-types */
import "./gridData.scss";

function GridMacroData({ data, index, compareIndex }) {
  const excludedIndicatorNames = [
    "Stock Market",
    "Current Account",
    "Current Account to GDP",
    "Government Debt to GDP",
    "Government Budget",
    "Corporate Tax Rate",
    "Personal Income Tax Rate",
    "Balance of Trade",
    "Building Permits",
    "Currency",
  ];

  function excludedIndicators(indicator) {
    return !excludedIndicatorNames.includes(indicator);
  }

  const countryKeys = Object.keys(data);
  const countryKey = countryKeys[index];
  const compCountryKey = countryKeys[compareIndex];
  const compCountryData = data[compCountryKey];
  const countryData = data[countryKey];

  if (!countryData || !compCountryData) {
    return <div className="no-data">No data available</div>;
  }


  const selectCompData = compCountryData.reduce((acc, item) => {
    acc[item.Indicator] = item.Last;
    return acc;
  }, {});

  return (
    <div className="grid-macro-data">
      <h2>{countryKey}</h2>
      <table>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Last</th>
            <th>Previous</th>
            <th>Highest</th>
            <th>Lowest</th>
            <th>Unit</th>
            <th>Date</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>
          {countryData
            .filter((item) => excludedIndicators(item.Indicator))
            .map((item, itemIndex) => {
              const findIndicator = selectCompData[item.Indicator];
              const strength = findIndicator
                ? item.Last > findIndicator
                  ? "Stronger"
                  : "Weaker"
                : "none";

              return (
                <tr key={itemIndex}>
                  <td>{item.Indicator}</td>
                  <td
                    style={{
                      color:
                        item.Last > item.Previous
                          ? "green"
                          : item.Last < item.Previous
                          ? "red"
                          : "black",
                    }}
                  >
                    {item.Last}
                  </td>
                  <td>{item.Previous}</td>
                  <td>{item.Highest}</td>
                  <td>{item.Lowest}</td>
                  <td>{item.Unit}</td>
                  <td>{item.Date}</td>
                  <td id="strengthId">
                    {strength ? (strength == "Stronger" ? "🟩" : "🟥") : "🟦"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default GridMacroData;
