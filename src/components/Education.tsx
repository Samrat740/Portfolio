import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen } from 'lucide-react';

const education = [
  {
    school: "Lovely Professional University",
    degree: "B.Tech in Computer Science Engineering",
    duration: "2022 - Present",
    location: "Punjab, India",
    description: "Currently pursuing B.Tech with specialization in AI & ML. Key subjects include Data Structures, Algorithms, Database Management, Machine Learning, and Cloud Computing.",
    courses: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Database Systems",
      "Cloud Computing",
      "Web Development"
    ]
  },
  {
    school: "Auxilium Convent School",
    degree: "Higher Secondary Education",
    duration: "2016 - 2022",
    location: "West Bengal, India",
    description: "Completed higher secondary education with focus on Science and Mathematics. Participated in various technical and cultural activities.",
    courses: [
      "Computer Science",
      "Physics",
      "Mathematics",
      "Chemistry",
      "English"
    ]
  }
];

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Education
        </motion.h2>

        <div ref={ref} className="space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-xl font-semibold">{edu.school}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">{edu.duration}</p>
                <p className="text-gray-600">{edu.location}</p>
              </div>

              <p className="text-gray-700 mb-6">{edu.description}</p>

              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                  Key Subjects
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {edu.courses.map((course) => (
                    <div
                      key={course}
                      className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm"
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}