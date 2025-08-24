'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  FileText, 
  Shield, 
  HelpCircle,
  TrendingUp
} from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API', href: '/api' },
      { name: 'Mobile App', href: '/mobile' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Community', href: '/community' },
      { name: 'Support', href: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/tradebrain', icon: Twitter },
    { name: 'GitHub', href: 'https://github.com/tradebrain', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/tradebrain', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@tradebrain.com', icon: Mail },
  ]

  const FooterSection = ({ 
    title, 
    links 
  }: { 
    title: string; 
    links: { name: string; href: string }[] 
  }) => (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">TradeBrain</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Sidhi baat no bakwas - Your intelligent trading companion for 
              analyzing performance, tracking strategies, and improving your trading game.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          <FooterSection title="Product" links={footerLinks.product} />
          <FooterSection title="Company" links={footerLinks.company} />
          <FooterSection title="Resources" links={footerLinks.resources} />
          <FooterSection title="Legal" links={footerLinks.legal} />
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 TradeBrain. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>•</span>
                <span>Made with ❤️ for traders</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Secured with SSL</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>4.7/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer