'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Target, 
  Upload, 
  Trophy, 
  Brain, 
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  Star,
  Zap
} from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const mainNavigation = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      description: 'Overview of your trading performance'
    },
    {
      title: 'Trading Journal',
      href: '/journal',
      icon: BookOpen,
      description: 'Record and analyze your trades'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Deep dive into your trading metrics'
    },
    {
      title: 'Strategies',
      href: '/strategies',
      icon: Target,
      description: 'Manage and track your strategies'
    },
  ]

  const toolsNavigation = [
    {
      title: 'Import Data',
      href: '/import',
      icon: Upload,
      description: 'Upload broker CSV files',
      badge: 'New'
    },
    {
      title: 'AI Insights',
      href: '/ai-insights',
      icon: Brain,
      description: 'AI-powered trading analysis',
      badge: 'Beta'
    },
    {
      title: 'Performance',
      href: '/performance',
      icon: TrendingUp,
      description: 'Performance heatmaps and charts'
    },
    {
      title: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      description: 'Time-based trading analysis'
    },
  ]

  const gamificationNavigation = [
    {
      title: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      description: 'Your badges and milestones'
    },
    {
      title: 'Leaderboard',
      href: '/leaderboard',
      icon: Star,
      description: 'Compare with other traders'
    },
    {
      title: 'Streaks',
      href: '/streaks',
      icon: Zap,
      description: 'Track your winning streaks'
    },
  ]

  const settingsNavigation = [
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account and preferences'
    },
  ]

  const NavItem = ({ item, isCollapsed }: { item: any; isCollapsed: boolean }) => {
    const Icon = item.icon
    const isActive = pathname === item.href

    return (
      <Link href={item.href}>
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
            isActive && "bg-accent text-accent-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </motion.div>
      </Link>
    )
  }

  const NavSection = ({ 
    title, 
    items, 
    isCollapsed 
  }: { 
    title: string; 
    items: any[]; 
    isCollapsed: boolean 
  }) => (
    <div className="mb-6">
      {!isCollapsed && (
        <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h4>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-full border-r bg-background"
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Logo Section */}
      <div className="flex items-center gap-2 p-6 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary-foreground" />
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="font-bold text-lg"
          >
            TradeBrain
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <NavSection 
          title="Main" 
          items={mainNavigation} 
          isCollapsed={isCollapsed} 
        />
        <NavSection 
          title="Tools" 
          items={toolsNavigation} 
          isCollapsed={isCollapsed} 
        />
        <NavSection 
          title="Gamification" 
          items={gamificationNavigation} 
          isCollapsed={isCollapsed} 
        />
        <NavSection 
          title="Settings" 
          items={settingsNavigation} 
          isCollapsed={isCollapsed} 
        />
      </ScrollArea>

      {/* User Info */}
      {!isCollapsed && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Pro Trader</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Sidebar