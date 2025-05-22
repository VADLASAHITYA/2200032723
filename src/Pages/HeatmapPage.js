import React, { useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Typography,
  Paper,
  Tooltip
} from '@mui/material';

// Mock stocks data
const mockStocks = [
  { name: "Apple Inc.", ticker: "AAPL" },
  { name: "Microsoft Corporation", ticker: "MSFT" },
  { name: "Nvidia Corporation", ticker: "NVDA" },
  { name: "Tesla, Inc.", ticker: "TSLA" },
  { name: "Amazon.com, Inc.", ticker: "AMZN" }
];

// Generate mock correlation matrix
const generateCorrelationMatrix = (stocks) => {
  const matrix = [];
  for (let i = 0; i < stocks.length; i++) {
    const row = [];
    for (let j = 0; j < stocks.length; j++) {
      // Generate random correlation between -1 and 1
      // But make diagonal 1 (perfect correlation with self)
      row.push(i === j ? 1 : (Math.random() * 2 - 1));
    }
    matrix.push(row);
  }
  return matrix;
};

const HeatmapPage = () => {
  const [timeFrame, setTimeFrame] = useState(30);
  const [correlationMatrix, setCorrelationMatrix] = useState(generateCorrelationMatrix(mockStocks));

  const handleTimeFrameChange = (minutes) => {
    setTimeFrame(minutes);
    // Regenerate correlations when time frame changes
    setCorrelationMatrix(generateCorrelationMatrix(mockStocks));
  };

  const getColor = (value) => {
    const hue = value > 0 ? 120 : 0; // Green for positive, red for negative
    const saturation = 100;
    const lightness = 50 - Math.abs(value) * 25;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 4 }}>
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

      <Box>
        <Typography variant="h6" gutterBottom>
          Stock Correlation Heatmap (Last {timeFrame} minutes)
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: getColor(1), mr: 1 }} />
          <Typography variant="caption">Strong Positive</Typography>
          <Box sx={{ width: 20, height: 20, backgroundColor: getColor(0), mx: 1 }} />
          <Typography variant="caption">No Correlation</Typography>
          <Box sx={{ width: 20, height: 20, backgroundColor: getColor(-1), mx: 1 }} />
          <Typography variant="caption">Strong Negative</Typography>
        </Box>

        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ display: 'inline-block' }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: 100 }} /> {/* Empty corner */}
              {mockStocks.map((stock, j) => (
                <Box key={j} sx={{ width: 100, textAlign: 'center', fontWeight: 'bold' }}>
                  {stock.ticker}
                </Box>
              ))}
            </Box>
            
            {mockStocks.map((stock, i) => (
              <Box key={i} sx={{ display: 'flex' }}>
                <Box sx={{ width: 100, fontWeight: 'bold', alignSelf: 'center' }}>
                  {stock.ticker}
                </Box>
                {mockStocks.map((_, j) => (
                  <Tooltip 
                    key={j} 
                    title={`Correlation between ${mockStocks[i].ticker} and ${mockStocks[j].ticker}: ${correlationMatrix[i][j].toFixed(2)}`}
                    arrow
                  >
                    <Paper 
                      sx={{ 
                        width: 100, 
                        height: 100, 
                        backgroundColor: getColor(correlationMatrix[i][j]),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {correlationMatrix[i][j].toFixed(2)}
                      </Typography>
                    </Paper>
                  </Tooltip>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeatmapPage;
