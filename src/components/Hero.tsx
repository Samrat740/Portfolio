import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 py-24">
        {/* perfect stable grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
          
          {/* TEXT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center text-center md:text-left"
          >
            <h1
              className="
                text-4xl md:text-6xl font-bold text-gray-800
                leading-tight 
                md:whitespace-nowrap   /* do NOT wrap on desktop */
                whitespace-normal      /* wrap on mobile */
              "
            >
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Samrat Ghosh
            </span>
          </h1>


            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
              Artificial Intelligence & Machine Learning Engineer · Robotics Process
              Automation Enthusiast · Full Stack Developer · Tech Explorer
            </p>

            {/* icons */}
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <motion.a
                whileHover={{ scale: 1.08 }}
                href="https://github.com/Samrat740"
                target="_blank"
                className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700"
              >
                <Github className="w-6 h-6" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08 }}
                href="https://linkedin.com/in/samratghosh2004"
                target="_blank"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08 }}
                href="mailto:samratghosh740@gmail.com"
                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <Mail className="w-6 h-6" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08 }}
                href="tel:+919609916176"
                className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                <Phone className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center md:justify-end"
          >
            <img
              src="/profile.jpg"
              alt="Samrat Ghosh"
              className="rounded-full object-cover shadow-2xl block"
              style={{
                width: 'clamp(220px, 30vw, 420px)',
                height: 'clamp(220px, 30vw, 420px)',
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
