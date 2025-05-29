
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { ChartData } from '@/lib/types';

interface ChartProps {
  data: ChartData[] | Array<Record<string, any>>;
  type: 'bar' | 'line' | 'pie' | 'area';
  height?: number;
  colors?: string[];
  dataKeys?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
}

export function Chart({
  data,
  type,
  height = 300,
  colors = ['#9b87f5', '#7E69AB', '#E5DEFF', '#D3E4FD', '#8E9196'],
  dataKeys = ['value'],
  showGrid = true,
  showLegend = true
}: ChartProps) {
  // Common tooltip style for all chart types
  const tooltipStyle = { 
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #E2E8F0',
    padding: '8px 12px'
  };
  
  // Common axis style
  const axisStyle = {
    fontSize: 12,
    fill: '#8E9196'
  };
  
  // Common legend style
  const legendStyle = {
    fontSize: '12px',
    color: '#8E9196'
  };

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />}
          <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: '#E5E7EB' }} />
          <YAxis tick={axisStyle} axisLine={{ stroke: '#E5E7EB' }} />
          <Tooltip contentStyle={tooltipStyle} />
          {showLegend && <Legend wrapperStyle={legendStyle} />}
          {dataKeys.map((key, index) => (
            <Bar 
              key={key}
              dataKey={key} 
              fill={colors[index % colors.length]} 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />}
          <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: '#E5E7EB' }} />
          <YAxis tick={axisStyle} axisLine={{ stroke: '#E5E7EB' }} />
          <Tooltip contentStyle={tooltipStyle} />
          {showLegend && <Legend wrapperStyle={legendStyle} />}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4, fill: colors[index % colors.length], strokeWidth: 0 }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              animationDuration={1500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
  
  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />}
          <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: '#E5E7EB' }} />
          <YAxis tick={axisStyle} axisLine={{ stroke: '#E5E7EB' }} />
          <Tooltip contentStyle={tooltipStyle} />
          {showLegend && <Legend wrapperStyle={legendStyle} />}
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              fill={colors[index % colors.length]}
              stroke={colors[index % colors.length]}
              fillOpacity={0.6}
              animationDuration={1500}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Pie chart with elegant styling
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={30} // Adding innerRadius for a more elegant donut chart
          fill="#9b87f5"
          dataKey={dataKeys[0]}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          animationDuration={1500}
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]}
              stroke="#ffffff"
              strokeWidth={1}
            />
          ))}
        </Pie>
        {showLegend && <Legend wrapperStyle={legendStyle} layout="horizontal" verticalAlign="bottom" align="center" />}
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}
