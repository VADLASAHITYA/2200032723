import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const StockChart = ({ data, stock }) => (
  <Card sx={{ margin: 2 }}>
    <CardContent>
      <Typography variant="h6">{stock} Price Chart</Typography>
      <LineChart width={800} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="lastUpdatedAt" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </CardContent>
  </Card>
);

export default StockChart;
