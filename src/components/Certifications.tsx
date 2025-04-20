import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award } from 'lucide-react';

const certifications = [
  {
    title: "Automation Developer Associate Training (v2023.10) for ICT Academy",
    organization: "UI Path",
    date: "2025",
    description: "Robotic Process Automation concepts, UI automation, Data manipulation, Selectors, Control flow, and REFramework.",
    image: "UI.jpg",
    url: "https://www.uipath.com/learning/automation-developer-associate-training"
  },
  {
    title: "Master Course in Artificial Intelligence",
    organization: "Great Learning",
    date: "2025",
    description: "Comprehensive program covering Machine learning algorithms, Natural Language Processing, Computer Vision, Deep learning, and practical AI applications.",
    image: "AI.jpg",
    url: "https://www.greatlearning.in/pg-programs/artificial-intelligence"
  },
  {
    title: "Cloud Computing",
    organization: "NPTEL",
    date: "2024",
    description: "Fundamentals of cloud computing, virtualization, and cloud service models.",
    image: "Nptel.jpg",
    url: "https://onlinecourses.nptel.ac.in/noc22_cs22/preview"
  },
  {
    title: "Application Development in Java",
    organization: "Lovely Professional University",
    date: "2024",
    description: "In-depth study of Java programming concepts, design patterns, and enterprise applications.",
    image: "Java.jpg",
    url: "https://www.lpu.in"
  },
  {
    title: "Mastering Data Structures and Algorithms using C and C++",
    organization: "Udemy",
    date: "2024",
    description: "Focusing on algorithmic problem-solving, time-space complexity, and in-depth implementation of data structures like arrays, linked lists, stacks, queues, trees, graphs, and hashing.",
    image: "DSA.jpg",
    url: "https://www.udemy.com/course/mastering-data-structures-and-algorithms-using-c-and-c/"
  },
  {
    title: "SQL for Data Science",
    organization: "Great Learning",
    date: "2023",
    description: "Advanced database concepts, SQL optimization, and database design principles.",
    image: "SQL.jpg",
    url: "https://www.greatlearning.in/academy/learn-for-free/courses/sql-for-data-science"
  }
];

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [showAll, setShowAll] = useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, 3);

  const handleVerifyClick = (url) => {
    window.open(url, '_blank'); // Opens the URL in a new tab
  };

  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Certifications
        </motion.h2>

        <div ref={ref} className="space-y-8">
          {visibleCerts.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out border border-gray-400"
            >
              <div className="md:w-1/4">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/4">
                <div className="flex items-center mb-2">
                  <Award className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold">{cert.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">
                  {cert.organization} • {cert.date}
                </p>
                <p className="text-gray-700">{cert.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleVerifyClick(cert.url)} // Redirect to URL
                    className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs py-1 px-3 rounded-full shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    Click to Verify
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 font-semibold transition"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  );
}
