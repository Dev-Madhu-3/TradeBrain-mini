'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Footer from './footer'

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showFooter?: boolean
}

const MainLayout = ({ 
  children, 
  showSidebar = true, 
  showFooter = true 
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex">
        {/* Sidebar - Desktop */}
        {showSidebar && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''} min-h-screen`}
        >
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </motion.main>
      </div>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  )
}

export default MainLayout