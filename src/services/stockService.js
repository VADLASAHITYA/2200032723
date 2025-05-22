const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchStocks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stocks`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

export const fetchStockHistory = async (ticker, minutes = 30) => {
  try {
    const response = await fetch(`${BASE_URL}/stocks/${ticker}?minutes=${minutes}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching history for ${ticker}:`, error);
    throw error;
  }
};

// Cache implementation to minimize API calls
const cache = new Map();

export const getCachedStockHistory = async (ticker, minutes) => {
  const cacheKey = `${ticker}-${minutes}`;
  
  // Return cached data if available and not expired
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < 60000) { // 1 minute cache
      return data;
    }
  }

  // Fetch fresh data
  const data = await fetchStockHistory(ticker, minutes);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
};
