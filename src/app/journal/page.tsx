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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  DollarSign,
  Activity,
  Tag,
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react'

export default function JournalPage() {
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    symbol: '',
    type: '',
    strategy: '',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    notes: '',
    tags: ''
  })

  // Mock trade data
  const trades = [
    {
      id: '1',
      symbol: 'AAPL',
      type: 'Long',
      strategy: 'Breakout',
      entryPrice: 175.20,
      exitPrice: 182.50,
      quantity: 100,
      pnl: 730,
      status: 'closed',
      entryDate: '2024-01-15T09:30:00Z',
      exitDate: '2024-01-15T14:30:00Z',
      notes: 'Strong breakout above resistance with high volume',
      tags: ['breakout', 'technical', 'momentum']
    },
    {
      id: '2',
      symbol: 'TSLA',
      type: 'Short',
      strategy: 'Swing',
      entryPrice: 238.90,
      exitPrice: 232.10,
      quantity: 50,
      pnl: 340,
      status: 'closed',
      entryDate: '2024-01-14T10:15:00Z',
      exitDate: '2024-01-14T15:45:00Z',
      notes: 'Failed to hold support level, good risk-reward ratio',
      tags: ['swing', 'support', 'risk-management']
    },
    {
      id: '3',
      symbol: 'NVDA',
      type: 'Long',
      strategy: 'Scalping',
      entryPrice: 495.30,
      exitPrice: 488.20,
      quantity: 25,
      pnl: -177.5,
      status: 'closed',
      entryDate: '2024-01-13T11:00:00Z',
      exitDate: '2024-01-13T11:45:00Z',
      notes: 'Quick scalp trade, stopped out when momentum faded',
      tags: ['scalp', 'quick-profit', 'stop-loss']
    },
    {
      id: '4',
      symbol: 'MSFT',
      type: 'Long',
      strategy: 'Position',
      entryPrice: 378.45,
      exitPrice: null,
      quantity: 75,
      pnl: 0,
      status: 'open',
      entryDate: '2024-01-16T09:45:00Z',
      exitDate: null,
      notes: 'Building position for earnings report next week',
      tags: ['position', 'earnings', 'long-term']
    },
  ]

  const strategies = ['Breakout', 'Swing', 'Scalping', 'Position', 'Momentum', 'Value']
  const symbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX']

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.strategy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || trade.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save to your backend
    console.log('Trade data:', formData)
    setIsAddTradeOpen(false)
    setFormData({
      symbol: '',
      type: '',
      strategy: '',
      entryPrice: '',
      exitPrice: '',
      quantity: '',
      notes: '',
      tags: ''
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Long':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Short':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const TradeCard = ({ trade }: { trade: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg">{trade.symbol}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{trade.symbol}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getTypeColor(trade.type)}>
                {trade.type}
              </Badge>
              <Badge variant="outline" className={getStatusColor(trade.status)}>
                {trade.status}
              </Badge>
              <Badge variant="secondary">{trade.strategy}</Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${
            trade.pnl > 0 ? 'text-green-600' : trade.pnl < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trade.pnl > 0 ? '+' : ''}{trade.pnl > 0 ? '$' : ''}{trade.pnl}
          </p>
          <p className="text-sm text-muted-foreground">
            {trade.quantity} shares
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-sm text-muted-foreground">Entry</p>
          <p className="font-medium">${trade.entryPrice}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(trade.entryDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Exit</p>
          <p className="font-medium">
            {trade.exitPrice ? `$${trade.exitPrice}` : '-'}
          </p>
          <p className="text-xs text-muted-foreground">
            {trade.exitDate ? new Date(trade.exitDate).toLocaleDateString() : 'Open'}
          </p>
        </div>
      </div>

      {trade.notes && (
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-1">Notes</p>
          <p className="text-sm">{trade.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {trade.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trading Journal</h1>
            <p className="text-muted-foreground">
              Record, analyze, and improve your trading performance
            </p>
          </div>
          <Dialog open={isAddTradeOpen} onOpenChange={setIsAddTradeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Trade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Trade</DialogTitle>
                <DialogDescription>
                  Record the details of your trade for future analysis
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Symbol</Label>
                    <Select value={formData.symbol} onValueChange={(value) => handleInputChange('symbol', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select symbol" />
                      </SelectTrigger>
                      <SelectContent>
                        {symbols.map(symbol => (
                          <SelectItem key={symbol} value={symbol}>{symbol}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Long">Long</SelectItem>
                        <SelectItem value="Short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="strategy">Strategy</Label>
                    <Select value={formData.strategy} onValueChange={(value) => handleInputChange('strategy', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        {strategies.map(strategy => (
                          <SelectItem key={strategy} value={strategy}>{strategy}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      placeholder="Number of shares"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entryPrice">Entry Price</Label>
                    <Input
                      id="entryPrice"
                      type="number"
                      step="0.01"
                      value={formData.entryPrice}
                      onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                      placeholder="Entry price"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exitPrice">Exit Price (Optional)</Label>
                    <Input
                      id="exitPrice"
                      type="number"
                      step="0.01"
                      value={formData.exitPrice}
                      onChange={(e) => handleInputChange('exitPrice', e.target.value)}
                      placeholder="Exit price"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Trade notes, analysis, or observations"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="e.g., breakout, technical, momentum"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddTradeOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Save Trade
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search trades by symbol, strategy, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trades</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Trades
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trades.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Win Rate
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total P&L
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$892.50</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Open Trades
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trades.filter(t => t.status === 'open').length}</div>
              <p className="text-xs text-muted-foreground">
                Active positions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trades List */}
        <div className="space-y-4">
          {filteredTrades.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Activity className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No trades found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Start by adding your first trade'
                  }
                </p>
                <Button onClick={() => setIsAddTradeOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Trade
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTrades.map(trade => (
              <TradeCard key={trade.id} trade={trade} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}