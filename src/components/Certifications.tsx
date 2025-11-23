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
    image: "/UI.jpg",
    url: "/UI.jpg"
  },
  {
    title: "Master Course in Artificial Intelligence",
    organization: "Great Learning",
    date: "2025",
    description: "Comprehensive program covering Machine learning algorithms, Natural Language Processing, Computer Vision, Deep learning, and practical AI applications.",
    image: "/AI.jpg",
    url: "https://www.mygreatlearning.com/certificate/DPHWZKLO"
  },
  {
    title: "Cloud Computing",
    organization: "NPTEL",
    date: "2024",
    description: "Fundamentals of cloud computing, virtualization, and cloud service models.",
    image: "/Nptel.jpg",
    url: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs118/Course/NPTEL24CS118S167020233504432336.pdf"
  },
  {
    title: "Application Development in Java",
    organization: "Lovely Professional University",
    date: "2024",
    description: "In-depth study of Java programming concepts, design patterns, and enterprise applications.",
    image: "/Java.jpg",
    url: "/Java.jpg"
  },
  {
    title: "Mastering Data Structures and Algorithms using C and C++",
    organization: "Udemy",
    date: "2024",
    description: "Focusing on algorithmic problem-solving, time-space complexity, and in-depth implementation of data structures like arrays, linked lists, stacks, queues, trees, graphs, and hashing.",
    image: "/DSA.jpg",
    url: "https://www.udemy.com/certificate/UC-6efd7058-9307-4a6e-9aba-f181e3527fb3/"
  },
  {
    title: "SQL for Data Science",
    organization: "Great Learning",
    date: "2023",
    description: "Advanced database concepts, SQL optimization, and database design principles.",
    image: "/SQL.jpg",
    url: "/SQL.jpg"
  }
];

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08
  });

  const [showAll, setShowAll] = useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, 3);

  const handleVerifyClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="certifications" className="py-16 md:py-20 bg-gray-50">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12"
        >
          Certifications
        </motion.h2>

        <div ref={ref} className="w-full">
          {/* responsive grid: 1 col mobile, 2 col md, 3 col lg */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visibleCerts.map((cert, index) => (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.06 }}
                className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out border border-gray-700 overflow-hidden"
              >

                {/* image area - fixed aspect ratio */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-xl">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>


                {/* content */}
                <div className="p-4 md:p-5 flex-1 flex flex-col">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {cert.organization} • {cert.date}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mt-3 text-sm md:text-sm flex-1">
                    {cert.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => handleVerifyClick(cert.url)}
                      className="
                        inline-flex items-center 
                        bg-gradient-to-r from-blue-500 to-fuchsia-600 
                        text-white 
                        text-[10px] md:text-xs 
                        py-1 px-2.5 
                        rounded-full 
                        shadow-sm 
                        hover:shadow-md 
                        transition 
                        hover:scale-[1.03]
                      "
                    >
                      Verify
                    </button>


                    <div className="text-xs text-gray-400 ml-2">
                      {index + 1}/{visibleCerts.length}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 font-semibold transition"
            aria-expanded={showAll}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  );
}
