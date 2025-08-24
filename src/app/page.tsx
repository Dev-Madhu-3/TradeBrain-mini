'use client'

import { motion } from 'framer-motion'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Trophy, 
  Star,
  Activity,
  BarChart3,
  Calendar,
  Users,
  Award,
  Zap,
  Plus
} from 'lucide-react'

export default function Home() {
  // Mock data for dashboard
  const stats = [
    {
      title: 'Total P&L',
      value: '+$12,450',
      change: '+15.3%',
      icon: DollarSign,
      trend: 'up',
      description: 'vs last month'
    },
    {
      title: 'Win Rate',
      value: '68.5%',
      change: '+2.1%',
      icon: Target,
      trend: 'up',
      description: 'vs last month'
    },
    {
      title: 'Total Trades',
      value: '247',
      change: '+12',
      icon: Activity,
      trend: 'up',
      description: 'this month'
    },
    {
      title: 'TIQS Score',
      value: '842',
      change: '+45',
      icon: Trophy,
      trend: 'up',
      description: 'excellent performance'
    },
  ]

  const recentTrades = [
    {
      symbol: 'AAPL',
      type: 'Long',
      entry: 175.20,
      exit: 182.50,
      pnl: '+$730',
      date: '2024-01-15',
      status: 'profit'
    },
    {
      symbol: 'TSLA',
      type: 'Short',
      entry: 238.90,
      exit: 232.10,
      pnl: '+$680',
      date: '2024-01-14',
      status: 'profit'
    },
    {
      symbol: 'NVDA',
      type: 'Long',
      entry: 495.30,
      exit: 488.20,
      pnl: '-$710',
      date: '2024-01-13',
      status: 'loss'
    },
    {
      symbol: 'MSFT',
      type: 'Long',
      entry: 378.45,
      exit: 385.90,
      pnl: '+$745',
      date: '2024-01-12',
      status: 'profit'
    },
  ]

  const achievements = [
    {
      title: 'Profit Streak',
      description: '5 consecutive profitable trades',
      icon: Zap,
      progress: 80,
      earned: true
    },
    {
      title: 'Volume Master',
      description: 'Trade 100+ contracts in a day',
      icon: BarChart3,
      progress: 65,
      earned: false
    },
    {
      title: 'Risk Manager',
      description: 'Maintain 2% risk per trade for 30 days',
      icon: Award,
      progress: 90,
      earned: false
    },
  ]

  const StatCard = ({ stat }: { stat: any }) => {
    const Icon = stat.icon
    const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
    const trendColor = stat.trend === 'up' ? 'text-green-600' : 'text-red-600'

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {stat.title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <TrendIcon className={`h-3 w-3 ${trendColor}`} />
            <span className={trendColor}>{stat.change}</span>
            <span>{stat.description}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your trading overview.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Trade
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    Your trading performance over the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-md">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Performance Chart</p>
                      <p className="text-sm text-muted-foreground">
                        Interactive charts coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Trade
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Manage Strategies
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>
                  Your latest trading activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-sm">{trade.symbol}</span>
                        </div>
                        <div>
                          <p className="font-medium">{trade.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            {trade.type} • {trade.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          trade.status === 'profit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {trade.pnl}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${trade.entry} → ${trade.exit}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={achievement.earned ? 'border-primary' : ''}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <achievement.icon className="w-5 h-5" />
                          <span>{achievement.title}</span>
                        </CardTitle>
                        {achievement.earned && (
                          <Badge variant="default">Earned</Badge>
                        )}
                      </div>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trading Analytics</CardTitle>
                <CardDescription>
                  Deep dive into your trading metrics and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-muted rounded-md">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-muted-foreground mb-2">
                      Advanced Analytics
                    </p>
                    <p className="text-muted-foreground">
                      Comprehensive analytics dashboard with AI-powered insights
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}