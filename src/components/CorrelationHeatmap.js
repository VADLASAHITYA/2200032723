import { getCorrelation } from '../utils/stats';

const CorrelationHeatmap = ({ stockData }) => {
  const tickers = Object.keys(stockData);
  const matrix = tickers.map(row => (
    tickers.map(col => {
      const x = stockData[row].map(p => p.price);
      const y = stockData[col].map(p => p.price);
      return getCorrelation(x, y).toFixed(2);
    })
  ));

  const getColor = (val) => {
    const num = parseFloat(val);
    if (num > 0.8) return '#0f0';
    if (num < -0.8) return '#f00';
    return '#ddd';
  };

  return (
    <table border="1">
      <thead>
        <tr><th></th>{tickers.map(t => <th key={t}>{t}</th>)}</tr>
      </thead>
      <tbody>
        {tickers.map((row, i) => (
          <tr key={row}>
            <th>{row}</th>
            {matrix[i].map((val, j) => (
              <td key={j} style={{ background: getColor(val) }}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CorrelationHeatmap;
