import {
  FaSearch,
  FaRegComments,
  FaShoppingCart,
  FaMoneyCheckAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch className="text-white w-6 h-6" />,
    title: "Browse Market Prices",
    desc: "Search and explore updated prices from various local markets across Bangladesh.",
    animation: "zoom-in",
  },
  {
    id: 2,
    icon: <FaRegComments className="text-white w-6 h-6" />,
    title: "Read Reviews & Compare",
    desc: "Read feedback from other users and compare price trends before making a decision.",
    animation: "zoom-in",
  },
  {
    id: 3,
    icon: <FaShoppingCart className="text-white w-6 h-6" />,
    title: "Add to Watchlist / Order",
    desc: "Track your desired products or place orders directly from your dashboard.",
    animation: "zoom-in",
  },
  {
    id: 4,
    icon: <FaMoneyCheckAlt className="text-white w-6 h-6" />,
    title: "Secure Stripe Payment",
    desc: "Make secure payments via Stripe with instant confirmation and order history tracking.",
    animation: "zoom-in",
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-16 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
          <FaQuestionCircle className="" />
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Understand how to use our local market price tracking system in 4 easy
          steps.
        </p>

        <div className="relative border-l-4 border-green-700 pl-6 space-y-10">
          {steps.map((step) => (
            <div key={step.id} data-aos={step.animation} className="relative">
              {/* Icon Badge */}
              <div className="absolute -left-[34px] top-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-full p-3 shadow-lg">
                {step.icon}
              </div>

              {/* Content */}
              <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-secondary mb-1">
                  Step {step.id}: {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
