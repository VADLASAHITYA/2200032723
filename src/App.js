import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StockPage from './Pages/StockPage';
import HeatmapPage from './Pages/HeatmapPage';
import { Tabs, Tab, Box, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const App = () => {
  const [page, setPage] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Stock Analytics Dashboard
        </Typography>
        <Tabs 
          value={page} 
          onChange={(_, val) => setPage(val)}
          sx={{ mb: 3 }}
        >
          <Tab label="Stock Chart" />
          <Tab label="Correlation Heatmap" />
        </Tabs>
        {page === 0 ? <StockPage /> : <HeatmapPage />}
      </Box>
    </ThemeProvider>
  );
};




