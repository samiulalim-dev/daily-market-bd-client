import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Abdul Karim",
    role: "Local Vendor",
    feedback:
      "This platform has made it so easy for me to sell my products and reach more customers every day.",
    image: "https://i.pravatar.cc/150?img=68",
  },
  {
    name: "Sultana Akter",
    role: "Daily Customer",
    feedback:
      "I love how I can check the daily market prices before going shopping. It saves me both time and money!",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Tanvir Hasan",
    role: "Small Business Owner",
    feedback:
      "Thanks to this website, I can promote my products through advertisements and grow my sales quickly.",
    image: "https://i.pravatar.cc/150?img=59",
  },
];

export default function Testimonials() {
  return (
    <section className="w-11/12 mx-auto py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center mb-10 text-green-700"
      >
        What People Say About Us
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="relative shadow-lg rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-white hover:from-emerald-100 hover:to-green-50 transition-all duration-500 p-6 group">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full ring-2 ring-emerald-400 shadow-md object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-green-800">
                    {item.name}
                  </h4>
                  <span className="text-sm text-gray-500">{item.role}</span>
                </div>
              </div>

              {/* Feedback */}
              <p className="text-gray-700 italic leading-relaxed relative pl-4 border-l-4 border-emerald-400">
                "{item.feedback}"
              </p>

              {/* Decorative element */}
              <div className="absolute bottom-3 right-3 text-6xl text-emerald-100 group-hover:text-emerald-200 transition-colors duration-500">
                ❝
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
