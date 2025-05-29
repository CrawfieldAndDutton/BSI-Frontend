
// Create mock customer data
export const mockData = {
  customers: Array.from({ length: 20 }, (_, i) => ({
    id: `CUST${1000 + i}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    status: ['Monitoring', 'Under Review', 'Analyzed', 'Approved', 'Rejected'][Math.floor(Math.random() * 5)],
    risk: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][Math.floor(Math.random() * 5)],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString().split('T')[0],
    signals: Math.floor(Math.random() * 10)
  })),
  
  signals: Array.from({ length: 30 }, (_, i) => ({
    id: `SIG${2000 + i}`,
    customerName: `Customer ${Math.floor(Math.random() * 20) + 1}`,
    customerId: `CUST${1000 + Math.floor(Math.random() * 20)}`,
    signalType: ['Salary Drop', 'Job Loss', 'Increased Savings', 'Higher EMI Load', 'New Loan Taken', 'Credit Card Overlimit', 'Lower Expense', 'Higher Expense'][Math.floor(Math.random() * 8)],
    severity: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    date: new Date(Date.now() - Math.floor(Math.random() * 20) * 86400000).toISOString().split('T')[0],
    status: ['New', 'Reviewed', 'Resolved'][Math.floor(Math.random() * 3)],
    description: 'Automated signal generated based on transaction pattern analysis.'
  }))
};
