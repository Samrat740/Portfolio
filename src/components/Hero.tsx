import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-32 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Riya Sinha
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Artificial Intelligence & Machine Learning Enginner | Robotics Process Automation Enthusiast | Full Stack Developer | Tech Explorer
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://github.com/Samrat740"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://linkedin.com/in/samratghosh2004"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="mailto:samratghosh740@gmail.com"
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="tel:+919609916176"
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              <Phone className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2"
        >
          <img
            src="/profile.jpg"
            alt="Samrat Ghosh"
            className="rounded-full w-64 h-64 md:w-96 md:h-96 object-cover mx-auto shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}