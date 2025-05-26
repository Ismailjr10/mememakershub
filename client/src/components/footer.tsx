import { Link } from "wouter";
import { Rocket } from "lucide-react";
import { FaTwitter, FaDiscord, FaTelegram, FaGithub } from "react-icons/fa";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Community Growth", href: "/services#community" },
      { label: "Design & Branding", href: "/services#design" },
      { label: "Marketing & PR", href: "/services#marketing" },
      { label: "Strategic Advisory", href: "/services#advisory" },
      { label: "Technical Development", href: "/services#technical" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Membership", href: "/membership" },
      { label: "Analytics", href: "/analytics" },
      { label: "Referral Program", href: "/dashboard#referrals" },
      { label: "NFT Rewards", href: "/dashboard#nfts" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Documentation", href: "/docs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  { icon: FaTwitter, href: "https://twitter.com/mememakershub", label: "Twitter" },
  { icon: FaDiscord, href: "https://discord.gg/mememakershub", label: "Discord" },
  { icon: FaTelegram, href: "https://t.me/mememakershub", label: "Telegram" },
  { icon: FaGithub, href: "https://github.com/mememakershub", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MemeMakers Hub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate Web3 growth platform for meme projects and crypto communities. From concept to moon.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            © 2024 MemeMakers Hub. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-400">Supported Networks:</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">Ξ</span>
              </div>
              <span className="text-gray-500">•</span>
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">◎</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
