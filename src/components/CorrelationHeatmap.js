import React, { useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Typography 
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for stocks
const mockStocks = [
  { name: "Apple Inc.", ticker: "AAPL" },
  { name: "Microsoft Corporation", ticker: "MSFT" },
  { name: "Nvidia Corporation", ticker: "NVDA" },
  { name: "Tesla, Inc.", ticker: "TSLA" },
  { name: "Amazon.com, Inc.", ticker: "AMZN" }
];

// Mock stock price data
const generateMockStockData = (ticker, minutes) => {
  const data = [];
  const now = new Date();
  const basePrice = 100 + Math.random() * 900; // Random base price between 100-1000
  
  for (let i = minutes; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      price: basePrice + (Math.random() * 20 - 10), // Random fluctuation
      lastUpdatedAt: time.toISOString()
    });
  }
  return data;
};

const StockPage = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [timeFrame, setTimeFrame] = useState(30);
  const [stockData, setStockData] = useState(generateMockStockData('AAPL', 30));

  const handleStockChange = (ticker) => {
    setSelectedStock(ticker);
    setStockData(generateMockStockData(ticker, timeFrame));
  };

  const handleTimeFrameChange = (minutes) => {
    setTimeFrame(minutes);
    setStockData(generateMockStockData(selectedStock, minutes));
  };

  const calculateAverage = () => {
    if (!stockData.length) return 0;
    const sum = stockData.reduce((acc, item) => acc + item.price, 0);
    return sum / stockData.length;
  };

  const average = calculateAverage();

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Stock</InputLabel>
          <Select
            value={selectedStock}
            onChange={(e) => handleStockChange(e.target.value)}
            label="Select Stock"
          >
            {mockStocks.map((stock) => (
              <MenuItem key={stock.ticker} value={stock.ticker}>
                {stock.name} ({stock.ticker})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Frame</InputLabel>
          <Select
            value={timeFrame}
            onChange={(e) => handleTimeFrameChange(e.target.value)}
            label="Time Frame"
          >
            <MenuItem value={10}>10 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={60}>1 hour</MenuItem>
            <MenuItem value={120}>2 hours</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ height: '500px' }}>
        <Typography variant="h6" gutterBottom>
          {mockStocks.find(s => s.ticker === selectedStock)?.name} - Last {timeFrame} minutes
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Average Price: ${average.toFixed(2)}
        </Typography>
        
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="lastUpdatedAt" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip 
              formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(value) => `Time: ${new Date(value).toLocaleTimeString()}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              name="Price"
            />
            <Line 
              type="monotone" 
              dataKey={() => average} 
              stroke="#82ca9d" 
              strokeDasharray="5 5"
              name="Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default StockPage;
