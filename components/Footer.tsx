
'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaDiscord, FaGithub, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 },
  };

  return (
    <footer className="relative bg-[#0F172A] text-white py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute -left-32 top-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
            Stay Updated with TrustVote
          </h3>
          <p className="text-gray-400 mb-8">
            Get the latest updates about secure blockchain voting technology and feature releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
            />
            <motion.button
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              Subscribe <FaArrowRight />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">TrustVote</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionizing digital democracy with secure, transparent, and tamper-proof 
              blockchain voting technology.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaLinkedin />, link: "https://linkedin.com" },
                { icon: <FaDiscord />, link: "https://discord.com" },
                { icon: <FaGithub />, link: "https://github.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["About", "Features", "How it Works", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TrustVote. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link 
              href="/terms" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              Terms
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;