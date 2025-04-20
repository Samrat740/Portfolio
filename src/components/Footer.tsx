import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Samrat740",
      color: "hover:bg-gray-800",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/samratghosh2004",
      color: "hover:bg-blue-600",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:samratghosh740@gmail.com",
      color: "hover:bg-red-600",
      label: "Email"
    },
    {
      icon: Phone,
      href: "tel:+919609916176",
      color: "hover:bg-green-600",
      label: "Phone"
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full bg-gray-100 text-gray-600 transition-colors ${link.color}`}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-gray-900"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="flex items-center justify-center text-gray-600">
              Made with 
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="mx-1"
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.div>
              by Samrat Ghosh
            </p>
            <p className="mt-1 text-sm text-gray-500">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>

          {/* Gradient Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          />
        </div>
      </div>
    </footer>
  );
}