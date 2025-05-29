
// Mock data for financial trends
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const trendsData = {
  income: months.map(month => ({
    name: month,
    average: Math.floor(Math.random() * 15000) + 30000,
    trend: Math.floor(Math.random() * 10000) + 25000
  })),
  expense: months.map(month => ({
    name: month,
    average: Math.floor(Math.random() * 10000) + 20000,
    trend: Math.floor(Math.random() * 8000) + 15000
  })),
  savings: months.map(month => ({
    name: month,
    average: Math.floor(Math.random() * 8000) + 5000,
    trend: Math.floor(Math.random() * 6000) + 3000
  }))
};
