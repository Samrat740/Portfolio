import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, Brain, Database, Layout, 
  Bot, Cloud, Terminal, Cpu
} from 'lucide-react';

const skills = [
  {
    category: "Programming Languages",
    icon: Code2,
    color: "text-blue-400",
    bgColor: "bg-gray-900",
    borderColor: "border-blue-800",
    items: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript"]
  },
  {
    category: "Web Development",
    icon: Layout,
    color: "text-green-400",
    bgColor: "bg-gray-900",
    borderColor: "border-green-800",
    items: ["React", "Node.js", "Express", "MongoDB", "HTML", "CSS"]
  },
  {
    category: "Machine Learning & NLP",
    icon: Brain,
    color: "text-purple-400",
    bgColor: "bg-gray-900",
    borderColor: "border-purple-800",
    items: ["Core ML Frameworks (TensorFlow, PyTorch, Scikit-learn)", "Text Preprocessing (NLTK, SpaCy)", "Word Embeddings (Word2Vec, Transformers)",
      "Transformers & Language Models", "Model Training & Evaluation"]
  },
  {
    category: "Computer Vision & Deep Learning",
    icon: Terminal,
    color: "text-yellow-400",
    bgColor: "bg-gray-900",
    borderColor: "border-yellow-800",
    items: ["OpenCV & Deep Learning", "Pose Estimation & Activity Recognition",
       "3D Vision & Tracking", "Style Transfer & Feature Extraction", "Object Detection & Segmentation"]
  },
  {
    category: "Mobile Development",
    icon: Bot,
    color: "text-red-400",
    bgColor: "bg-gray-900",
    borderColor: "border-red-800",
    items: ["Java", "Kotlin", "Dart"]
  },
  {
    category: "Data Science",
    icon: Database,
    color: "text-indigo-400",
    bgColor: "bg-gray-900",
    borderColor: "border-indigo-800",
    items: ["Data Manipulation & Analysis", "Data Visualization", "ML Integration", "Data Preprocessing & Feature Engineering", "Dashboarding & Reporting: Power BI, Tableau, Streamlit"]
  },
  {
    category: "Robotic Process Automation",
    icon: Cpu,
    color: "text-pink-400",
    bgColor: "bg-gray-900",
    borderColor: "border-pink-800",
    items: ["Blue Prism", "UiPath", "Automation Anywhere"]
  },
  {
    category: "Big Data",
    icon: Cloud,
    color: "text-orange-400",
    bgColor: "bg-gray-900",
    borderColor: "border-orange-800",
    items: ["SQL", "Hadoop", "Spark", "Hive", "MapReduce"]
  }
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
        >
          Skills & Expertise
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`${skill.bgColor} border ${skill.borderColor} p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300`}
              >
                <div className="flex items-center mb-4">
                  <Icon className={`w-6 h-6 mr-2 ${skill.color}`} />
                  <h3 className="text-lg font-semibold text-white">{skill.category}</h3>
                </div>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div
                      key={item}
                      className="bg-gray-900/50 px-3 py-1.5 rounded-lg text-sm text-gray-300 border border-gray-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}