import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showPopup, setShowPopup] = useState(false); // State to show/hide the popup

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Creating a FormData object to send data to Formspree
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('message', formData.message);

    try {
      const response = await fetch('https://formspree.io/f/mpwpvvkg', {
        method: 'POST',
        body: form,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        // If submission is successful, show the popup
        setShowPopup(true);

        // Reset the form data
        setFormData({
          name: '',
          email: '',
          message: '',
        });

        // Hide the popup after a short delay (for animation purposes)
        setTimeout(() => {
          setShowPopup(false);
        }, 3000); // Popup will disappear after 3 seconds
      } else {
        console.error('Formspree submission failed.');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-tr from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14"
        >
          Let's Connect
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <ContactCard
              icon={<Mail className="w-6 h-6 text-blue-600" />}
              title="Email"
              content="samratghosh740@gmail.com"
              href="mailto:samratghosh740@gmail.com"
            />
            <ContactCard
              icon={<Phone className="w-6 h-6 text-green-600" />}
              title="Phone"
              content="+91 9609916176"
              href="tel:+919609916176"
            />
            <ContactCard
              icon={<MapPin className="w-6 h-6 text-purple-600" />}
              title="Location"
              content="Kolkata, West Bengal, India"
            />
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-5 border border-gray-100"
          >
            <FloatingInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <FloatingInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FloatingTextarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Thank You Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Thank you!</h2>
            <p className="text-gray-600">Your message has been sent successfully.</p>
          </div>
        </motion.div>
      )}
    </section>
  );
}

function ContactCard({ icon, title, content, href }: any) {
  return (
    <div className="flex items-start p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition border border-gray-100">
      <div className="p-2 bg-gray-100 rounded-full mr-4">{icon}</div>
      <div>
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        {href ? (
          <a href={href} className="text-gray-600 text-sm hover:text-blue-600">
            {content}
          </a>
        ) : (
          <p className="text-sm text-gray-600">{content}</p>
        )}
      </div>
    </div>
  );
}

function FloatingInput({ label, name, type, value, onChange }: any) {
  return (
    <div className="relative z-0">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full px-3 pt-5 pb-2 text-sm bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder=" "
      />
      <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-3 z-10 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name, value, onChange }: any) {
  return (
    <div className="relative z-0">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required
        rows={4}
        className="peer w-full px-3 pt-5 pb-2 text-sm bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
        placeholder=" "
      />
      <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-3 z-10 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600">
        {label}
      </label>
    </div>
  );
}
