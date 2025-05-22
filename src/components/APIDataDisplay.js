function App() {
  const stocks = [
    { symbol: 'AAPL', price: 182.50, change: 1.24 },
    { symbol: 'GOOGL', price: 2753.42, change: -0.58 },
    { symbol: 'AMZN', price: 144.25, change: 0.95 },
    { symbol: 'TSLA', price: 220.90, change: -2.15 },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📈 Stock Price Aggregator</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td style={{ color: stock.change >= 0 ? 'green' : 'red' }}>
                {stock.change >= 0 ? '+' : ''}
                {stock.change}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
