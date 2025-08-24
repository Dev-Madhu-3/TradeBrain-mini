'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Target, 
  Trophy,
  Edit,
  Save,
  X,
  Shield,
  Bell,
  Globe,
  DollarSign,
  Activity
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    bio: 'Passionate trader with 5+ years of experience in stocks and options. Focused on technical analysis and risk management.',
    tradingStyle: 'Swing Trading',
    experience: 'Intermediate',
    goals: 'Achieve consistent 20% annual returns while managing risk effectively'
  })

  const stats = [
    {
      title: 'Total P&L',
      value: '+$12,450',
      change: '+15.3%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Win Rate',
      value: '68.5%',
      change: '+2.1%',
      icon: Target,
      trend: 'up'
    },
    {
      title: 'Total Trades',
      value: '247',
      change: '+12',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'TIQS Score',
      value: '842',
      change: '+45',
      icon: Trophy,
      trend: 'up'
    },
  ]

  const achievements = [
    { title: 'Profit Master', description: 'Achieved $10,000+ in profits', earned: true },
    { title: 'Consistency King', description: 'Maintained 60%+ win rate for 30 days', earned: true },
    { title: 'Risk Manager', description: 'Perfect risk management for 50 trades', earned: false },
    { title: 'Volume Trader', description: 'Executed 500+ trades', earned: false },
  ]

  const recentActivity = [
    { type: 'trade', symbol: 'AAPL', pnl: '+$730', date: '2 hours ago' },
    { type: 'achievement', title: 'Profit Streak', date: '1 day ago' },
    { type: 'trade', symbol: 'TSLA', pnl: '+$680', date: '2 days ago' },
    { type: 'strategy', name: 'Breakout Strategy', date: '3 days ago' },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false)
  }

  const StatCard = ({ stat }: { stat: any }) => {
    const Icon = stat.icon
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
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">{stat.change}</span> from last month
          </p>
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
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account and trading preferences
            </p>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/avatars/01.png" alt="Profile" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{formData.name}</h2>
                    <p className="text-muted-foreground">{formData.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      {formData.experience} Trader
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined January 2024</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span>{formData.tradingStyle}</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StatCard stat={stat} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trading">Trading</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest trading activity and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              {activity.type === 'trade' && <TrendingUp className="w-4 h-4" />}
                              {activity.type === 'achievement' && <Trophy className="w-4 h-4" />}
                              {activity.type === 'strategy' && <Target className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-medium">
                                {activity.type === 'trade' && `Trade: ${activity.symbol}`}
                                {activity.type === 'achievement' && `Achievement: ${activity.title}`}
                                {activity.type === 'strategy' && `Strategy: ${activity.name}`}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {activity.type === 'trade' && `P&L: ${activity.pnl}`}
                                {activity.type === 'achievement' && 'New milestone reached'}
                                {activity.type === 'strategy' && 'Strategy updated'}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {activity.date}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trading" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Preferences</CardTitle>
                    <CardDescription>
                      Configure your trading style and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tradingStyle">Trading Style</Label>
                        <Input
                          id="tradingStyle"
                          value={formData.tradingStyle}
                          onChange={(e) => handleInputChange('tradingStyle', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Input
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">Trading Goals</Label>
                      <Textarea
                        id="goals"
                        value={formData.goals}
                        onChange={(e) => handleInputChange('goals', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Badges</CardTitle>
                    <CardDescription>
                      Track your progress and earned achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className={achievement.earned ? 'border-primary' : 'opacity-60'}>
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Trophy className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{achievement.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {achievement.description}
                                  </p>
                                </div>
                                {achievement.earned && (
                                  <Badge variant="default">Earned</Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5" />
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5" />
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about your trading activity
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5" />
                          <div>
                            <h4 className="font-medium">Language & Region</h4>
                            <p className="text-sm text-muted-foreground">
                              Set your preferred language and region
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}