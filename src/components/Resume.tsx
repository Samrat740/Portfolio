import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export default function Resume() {
  return (
    <section
      id="resume"
      className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          {/* Left: Resume Preview */}
          <motion.a
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <img
              src="resume_image.jpg"
              alt="Resume Preview"
              className="w-full md:w-[380px] object-cover"
            />
          </motion.a>

          {/* Right: Text + Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left max-w-lg"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              My Resume
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Take a quick look at my resume and explore my experiences, skills,
              and certifications. Click the preview to view or download.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              <FileText className="w-6 h-6 mr-2" />
              <span className="text-lg">View / Download Resume</span>
              <Download className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bubble */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 opacity-30 rounded-full blur-3xl z-0" />
    </section>
  );
}
