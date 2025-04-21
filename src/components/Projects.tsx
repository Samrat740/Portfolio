import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "AI Travel Planner",
    description: "An intelligent travel planning application that uses AI to create personalized itineraries based on user preferences and constraints.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=500",
    github: "https://github.com/Samrat740/AI-Powered-Travel-Planner",
    demo: "https://ai-powered-travel-planner-kquowvjmt8wcnftrebcpet.streamlit.app/",
    tech: ["Python", "TensorFlow", "Flask", "React"]
  },
  {
    title: "Seed AI App",
    description: "Machine learning application for identifying plant diseases and providing treatment recommendations using computer vision.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=500",
    github: "https://github.com/Samrat740/Seed-quality-analyzer",
    demo: "https://seed-quality-analyzer-zyhrrvlethrwmfgfmev3fj.streamlit.app/",
    tech: ["Python", "OpenCV","HSV", "Laplachian", "Feature Extraction"]
  },
  {
    title: "Movie Recommender",
    description: "Content-based movie recommendation system using natural language processing and collaborative filtering.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=500",
    github: "https://github.com/Samrat740/movie-recommender",
    demo: "/a.html",
    tech: ["Python", "Scikit-learn", "NLTK", "Streamlit"]
  },
  {
    title: "Email Classifier",
    description: "AI-powered email classification system that automatically categorizes emails based on content and priority.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=500",
    github: "https://github.com/Samrat740/email-classifier",
    demo: "/a.html",
    tech: ["Python", "SpaCy", "TensorFlow", "Flask"]
  },
  {
    title: "Flight Bot",
    description: "RPA bot for automated flight booking and price tracking using Blue Prism.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=500",
    github: "https://github.com/Samrat740/flight-bot",
    demo: "/a.html",
    tech: ["Blue Prism", "Python", "Selenium"]
  },
  {
    title: "Quiz App",
    description: "Interactive quiz application with real-time scoring and leaderboard functionality.",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=500",
    github: "https://github.com/Samrat740/quiz-app",
    demo: "/a.html",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"]
  }
];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="projects" className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Featured Projects
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-900/50 px-3 py-1 rounded-full text-xs text-blue-300 border border-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm">View Code</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm">Live Demo</span>
                  </motion.a>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}