'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Trophy, 
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Clock,
  Users,
  Award,
  Zap
} from 'lucide-react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  const [isLoading, setIsLoading] = useState(false)

  // Mock analytics data
  const performanceMetrics = [
    {
      title: 'Total Return',
      value: '+$24,580',
      change: '+18.2%',
      icon: TrendingUp,
      trend: 'up',
      description: 'All-time performance'
    },
    {
      title: 'Win Rate',
      value: '72.4%',
      change: '+4.1%',
      icon: Target,
      trend: 'up',
      description: 'Success rate'
    },
    {
      title: 'Profit Factor',
      value: '2.34',
      change: '+0.18',
      icon: Trophy,
      trend: 'up',
      description: 'Profit vs Loss ratio'
    },
    {
      title: 'Sharpe Ratio',
      value: '1.82',
      change: '+0.12',
      icon: BarChart3,
      trend: 'up',
      description: 'Risk-adjusted returns'
    },
  ]

  const tradeAnalysis = [
    {
      category: 'By Symbol',
      data: [
        { name: 'AAPL', trades: 45, winRate: 78, pnl: '+$3,240' },
        { name: 'TSLA', trades: 38, winRate: 65, pnl: '+$2,180' },
        { name: 'NVDA', trades: 32, winRate: 71, pnl: '+$2,890' },
        { name: 'MSFT', trades: 28, winRate: 82, pnl: '+$1,950' },
        { name: 'GOOGL', trades: 24, winRate: 58, pnl: '+$890' },
      ]
    },
    {
      category: 'By Strategy',
      data: [
        { name: 'Breakout', trades: 67, winRate: 75, pnl: '+$5,420' },
        { name: 'Swing', trades: 54, winRate: 68, pnl: '+$3,890' },
        { name: 'Scalping', trades: 89, winRate: 62, pnl: '+$2,340' },
        { name: 'Position', trades: 23, winRate: 80, pnl: '+$4,120' },
      ]
    },
    {
      category: 'By Time Frame',
      data: [
        { name: '1min', trades: 45, winRate: 58, pnl: '+$890' },
        { name: '5min', trades: 67, winRate: 64, pnl: '+$2,340' },
        { name: '15min', trades: 38, winRate: 72, pnl: '+$3,120' },
        { name: '1hour', trades: 29, winRate: 78, pnl: '+$4,560' },
        { name: 'Daily', trades: 18, winRate: 83, pnl: '+$3,890' },
      ]
    }
  ]

  const riskMetrics = [
    {
      title: 'Max Drawdown',
      value: '-12.4%',
      change: '-2.1%',
      icon: TrendingDown,
      trend: 'down',
      description: 'Maximum loss from peak',
      status: 'good'
    },
    {
      title: 'Avg Win/Loss',
      value: '2.8:1',
      change: '+0.3',
      icon: Target,
      trend: 'up',
      description: 'Average win vs loss ratio',
      status: 'excellent'
    },
    {
      title: 'Risk per Trade',
      value: '1.8%',
      change: '-0.2%',
      icon: Activity,
      trend: 'down',
      description: 'Average risk per trade',
      status: 'good'
    },
    {
      title: 'Recovery Factor',
      value: '3.2',
      change: '+0.4',
      icon: Award,
      trend: 'up',
      description: 'Ability to recover from losses',
      status: 'excellent'
    },
  ]

  const monthlyPerformance = [
    { month: 'Jan', pnl: 2450, trades: 42, winRate: 68 },
    { month: 'Feb', pnl: 1890, trades: 38, winRate: 71 },
    { month: 'Mar', pnl: 3200, trades: 45, winRate: 74 },
    { month: 'Apr', pnl: 2800, trades: 41, winRate: 70 },
    { month: 'May', pnl: 4100, trades: 48, winRate: 76 },
    { month: 'Jun', pnl: 3650, trades: 44, winRate: 73 },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const MetricCard = ({ metric }: { metric: any }) => {
    const Icon = metric.icon
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            {getTrendIcon(metric.trend)}
            <span className={getTrendColor(metric.trend)}>{metric.change}</span>
            <span>{metric.description}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const RiskMetricCard = ({ metric }: { metric: any }) => {
    const Icon = metric.icon
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {getTrendIcon(metric.trend)}
              <span className={getTrendColor(metric.trend)}>{metric.change}</span>
            </div>
            <Badge variant="outline" className={getStatusColor(metric.status)}>
              {metric.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {metric.description}
          </p>
        </CardContent>
      </Card>
    )
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Deep dive into your trading performance and metrics
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trade-analysis">Trade Analysis</TabsTrigger>
            <TabsTrigger value="risk-metrics">Risk Metrics</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    Your trading performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-md">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Performance Chart</p>
                      <p className="text-sm text-muted-foreground">
                        Interactive P&L chart coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Breakdown</CardTitle>
                  <CardDescription>
                    Performance metrics by month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyPerformance.map((month, index) => (
                      <div key={month.month} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{month.month}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                              {month.trades} trades
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {month.winRate}% win rate
                            </span>
                            <span className={`font-medium ${
                              month.pnl > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {month.pnl > 0 ? '+' : ''}${month.pnl}
                            </span>
                          </div>
                        </div>
                        <Progress 
                          value={Math.abs(month.pnl) / 50} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trade-analysis" className="space-y-6">
            {tradeAnalysis.map((category, categoryIndex) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle>Trade Analysis by {category.category}</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your trading performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.data.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-sm">{item.name}</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.trades} trades • {item.winRate}% win rate
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            item.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.pnl}
                          </p>
                          <div className="flex items-center justify-end space-x-1">
                            <Progress value={item.winRate} className="w-16 h-2" />
                            <span className="text-xs text-muted-foreground">
                              {item.winRate}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="risk-metrics" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {riskMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RiskMetricCard metric={metric} />
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>
                  Comprehensive risk management metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-md">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Risk Analysis Chart</p>
                    <p className="text-sm text-muted-foreground">
                      Advanced risk metrics visualization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Patterns</CardTitle>
                  <CardDescription>
                    AI-detected patterns in your trading behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-medium">Morning Trading Success</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        You perform 23% better in morning trades (9 AM - 12 PM)
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Pattern Detected</Badge>
                        <span className="text-xs text-muted-foreground">Confidence: 87%</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-5 h-5 text-green-600" />
                        <h4 className="font-medium">Breakout Strategy Excellence</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your breakout strategy has 78% win rate vs 65% average
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">Strength</Badge>
                        <span className="text-xs text-muted-foreground">Confidence: 92%</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium">Optimal Hold Time</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Best results when holding trades for 2-5 days
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Insight</Badge>
                        <span className="text-xs text-muted-foreground">Confidence: 74%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>
                    AI-powered suggestions to improve your trading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 rounded">
                      <h4 className="font-medium text-blue-900">Focus on Morning Trading</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Consider concentrating your trading activity during morning hours 
                        where you show the best performance.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-l-green-500 bg-green-50 rounded">
                      <h4 className="font-medium text-green-900">Scale Breakout Strategy</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Your breakout strategy shows excellent results. Consider allocating 
                        more capital to this strategy.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50 rounded">
                      <h4 className="font-medium text-yellow-900">Review Afternoon Trades</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your performance drops in the afternoon. Consider reducing 
                        trading volume during this time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}