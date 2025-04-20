import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Users, Heart, Trophy } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              Education & Focus
            </h3>
            <p className="text-gray-600">
              Currently pursuing B.Tech in Computer Science Engineering at Lovely Professional University,
              with a strong focus on Machine Learning and Robotic Process Automation.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-green-600" />
              Leadership
            </h3>
            <p className="text-gray-600">
              Served as Media Club President, demonstrating strong leadership and organizational skills
              while managing various cultural and technical events.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-600" />
              Hobbies & Interests
            </h3>
            <p className="text-gray-600">
              Passionate about exploring new technologies, problem-solving, and contributing to
              open-source projects. Enjoy coding challenges and hackathons.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
              Achievements
            </h3>
            <p className="text-gray-600">
              Silver Medal in Hindi Olympiad, consistently maintaining excellent academic performance,
              and successfully leading multiple technical projects.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}