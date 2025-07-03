import React, { useState, useEffect, Suspense } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Typography, 
  Button, 
  Menu, 
  MenuHandler, 
  MenuList, 
  MenuItem 
} from '@material-tailwind/react';
import { 
  ArrowDownTrayIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  TicketIcon,
  FunnelIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

// Import ApexCharts with a simple dynamic import
let Chart;

// Use a dynamic import for ApexCharts
import('react-apexcharts').then(module => {
  Chart = module.default || module;
});

// Fallback component in case the chart is not loaded yet
const ChartFallback = () => (
  <div className="h-full w-full flex items-center justify-center">
    Loading chart...
  </div>
);

// Date range options
const dateRanges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'This year', value: 'year' },
  { label: 'All time', value: 'all' },
];

// KPI Card Component
const KPICard = ({ title, value, change, icon: Icon, color }) => (
  <Card className="shadow-sm border border-gray-100 dark:border-gray-700">
    <CardBody className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="small" color="gray" className="font-normal dark:text-gray-300">
            {title}
          </Typography>
          <Typography variant="h4" className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </Typography>
          <div className={`flex items-center mt-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <ArrowTrendingUpIcon className={`h-4 w-4 mr-1 ${change < 0 ? 'transform rotate-180' : ''}`} />
            {Math.abs(change)}% from last period
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-opacity-10 ${color}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </CardBody>
  </Card>
);

// Chart theme configuration
const getChartTheme = (isDark) => ({
  chart: {
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif',
    background: 'transparent',
    foreColor: isDark ? '#E5E7EB' : '#4B5563',
  },
  grid: {
    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    strokeDashArray: 4,
  },
  tooltip: {
    theme: isDark ? 'dark' : 'light',
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: isDark ? '#9CA3AF' : '#6B7280',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: isDark ? '#9CA3AF' : '#6B7280',
      },
    },
  },
  legend: {
    labels: {
      colors: isDark ? '#E5E7EB' : '#111827',
    },
  },
});


// Generate time-based data for charts
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Line chart configuration
const getLineChartConfig = (isDark) => ({
  options: {
    ...getChartTheme(isDark),
    chart: {
      ...getChartTheme(isDark).chart,
      type: 'area',
      height: 350,
    },
    xaxis: {
      ...getChartTheme(isDark).xaxis,
      categories: months,
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toLocaleString(),
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#4F46E5'],
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    tooltip: {
      ...getChartTheme(isDark).tooltip,
      x: {
        show: true,
        formatter: (val) => `Month: ${months[val - 1]}`,
      },
      y: {
        formatter: (val) => `${val} visitors`,
        title: {
          formatter: () => 'Visitors',
        },
      },
    },
  },
  series: [
    {
      name: 'Monthly Visitors',
      data: [3000, 4200, 3800, 5600, 4900, 6200, 7000, 8100, 7500, 9200, 8900, 10500],
    },
  ],
  type: 'area',
  height: 350,
});

// Bar chart configuration
const getBarChartConfig = (isDark) => ({
  options: {
    ...getChartTheme(isDark),
    chart: {
      ...getChartTheme(isDark).chart,
      type: 'bar',
      height: 350,
    },
    xaxis: {
      ...getChartTheme(isDark).xaxis,
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
        distributed: false,
      },
    },
    tooltip: {
      ...getChartTheme(isDark).tooltip,
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
        title: {
          formatter: () => 'Revenue',
        },
      },
    },
  },
  series: [
    {
      name: 'Revenue',
      data: [2500, 3900, 4200, 3800, 5100, 7200, 6500],
    },
  ],
  type: 'bar',
  height: 350,
});

// Donut chart configuration
const getDonutChartConfig = (isDark) => ({
  options: {
    ...getChartTheme(isDark),
    chart: {
      ...getChartTheme(isDark).chart,
      type: 'donut',
    },
    labels: ['Direct', 'Organic', 'Referral', 'Social', 'Email'],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: isDark ? '#E5E7EB' : '#111827',
              formatter: () => '$12,845',
            },
          },
        },
      },
    },
    tooltip: {
      ...getChartTheme(isDark).tooltip,
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
  series: [12500, 21500, 18500, 28500, 14800],
  type: 'donut',
  height: 350,
});

// Demographics chart configuration
const getDemographicsConfig = (isDark) => ({
  options: {
    ...getChartTheme(isDark),
    chart: {
      ...getChartTheme(isDark).chart,
      type: 'pie',
    },
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
    tooltip: {
      ...getChartTheme(isDark).tooltip,
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  },
  series: [25, 35, 20, 12, 8],
  type: 'pie',
  height: 350,
});

// Top events data
const topEvents = [
  { id: 1, name: 'Summer Music Festival', sales: 1245, revenue: 12450, change: 12.5 },
  { id: 2, name: 'Tech Conference 2023', sales: 980, revenue: 24500, change: 8.2 },
  { id: 3, name: 'Food & Wine Expo', sales: 756, revenue: 15120, change: -3.2 },
  { id: 4, name: 'Art Exhibition', sales: 432, revenue: 8640, change: 5.7 },
];

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200">Something went wrong</h2>
          <p className="mt-2 text-red-700 dark:text-red-300">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Date Range Selector Component
const DateRangeSelector = ({ activeRange, onSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <Button
          variant="outlined"
          className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
        >
          <CalendarIcon className="h-4 w-4" />
          {dateRanges.find(range => range.value === activeRange)?.label}
          <svg
            className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {dateRanges.map((range) => (
          <MenuItem
            key={range.value}
            onClick={() => onSelect(range.value)}
            className={`flex items-center gap-2 ${activeRange === range.value ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
          >
            {activeRange === range.value && <CheckIcon className="h-4 w-4" />}
            {range.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

export default function Analysis() {
  const [isClient, setIsClient] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [dateRange, setDateRange] = React.useState('30d');
  const [isLoading, setIsLoading] = React.useState(true);
  const [exporting, setExporting] = React.useState(false);
  
  // Check for dark mode preference on client-side
  React.useEffect(() => {
    setIsClient(true);
    // Check for dark mode preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    // Listen for changes in color scheme
    const handler = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(handler);
    
    // Simulate loading data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    return () => {
      darkModeMediaQuery.removeListener(handler);
      clearTimeout(timer);
    };
  }, []);

  // Handle export report
  const handleExport = async () => {
    setExporting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setExporting(false);
    // In a real app, this would trigger a file download
    alert('Report exported successfully!');
  };

  if (!isClient || isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-80"></div>
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <LoadingSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Monitor your event performance and sales metrics</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <DateRangeSelector 
                  activeRange={dateRange} 
                  onSelect={setDateRange} 
                />
                <Button
                  variant="filled"
                  color="indigo"
                  className="flex items-center gap-2"
                  onClick={handleExport}
                  disabled={exporting}
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  {exporting ? 'Exporting...' : 'Export Report'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Total Revenue"
              value="$54,236"
              change={12.5}
              icon={CurrencyDollarIcon}
              color="text-green-500"
            />
            <KPICard
              title="Tickets Sold"
              value="3,428"
              change={8.3}
              icon={TicketIcon}
              color="text-blue-500"
            />
            <KPICard
              title="Total Events"
              value="24"
              change={-2.1}
              icon={ChartBarIcon}
              color="text-purple-500"
            />
            <KPICard
              title="Total Attendees"
              value="8,745"
              change={18.7}
              icon={UserGroupIcon}
              color="text-amber-500"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visitors Chart */}
            <Card className="shadow-sm border border-gray-100 dark:border-gray-700">
              <CardBody className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white">
                      Monthly Visitors
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal dark:text-gray-400">
                      Track your event page visitors over time
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Visitors</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  {Chart ? (
                    <Chart {...getLineChartConfig(isDarkMode)} />
                  ) : (
                    <ChartFallback />
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Revenue Chart */}
            <Card className="shadow-sm border border-gray-100 dark:border-gray-700">
              <CardBody className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white">
                      Revenue Sources
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal dark:text-gray-400">
                      Breakdown of your revenue by source
                    </Typography>
                  </div>
                </div>
                <div className="h-80">
                  {Chart ? (
                    <Chart {...getDonutChartConfig(isDarkMode)} />
                  ) : (
                    <ChartFallback />
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Ticket Sales Chart */}
            <Card className="shadow-sm border border-gray-100 dark:border-gray-700">
              <CardBody className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white">
                      Weekly Ticket Sales
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal dark:text-gray-400">
                      Track your ticket sales performance
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Revenue</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  {Chart ? (
                    <Chart {...getBarChartConfig(isDarkMode)} />
                  ) : (
                    <ChartFallback />
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Demographics Chart */}
            <Card className="shadow-sm border border-gray-100 dark:border-gray-700">
              <CardBody className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white">
                      Attendee Demographics
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal dark:text-gray-400">
                      Age distribution of your attendees
                    </Typography>
                  </div>
                </div>
                <div className="h-80">
                  {Chart ? (
                    <Chart {...getDemographicsConfig(isDarkMode)} />
                  ) : (
                    <ChartFallback />
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Top Events Table */}
          <div className="mt-8">
            <Card className="shadow-sm border border-gray-100 dark:border-gray-700">
              <CardBody className="p-0">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white">
                    Top Performing Events
                  </Typography>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Event Name
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Tickets Sold
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {topEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {event.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                            {event.sales.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                            ${event.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              event.change >= 0 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {event.change >= 0 ? '↑' : '↓'} {Math.abs(event.change)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                  <Button variant="text" className="text-indigo-600 dark:text-indigo-400 hover:underline p-0">
                    View all events
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Ivent. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
