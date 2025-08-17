import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TermsAndConditions = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const sections = [
    {
      title: "1. Use of Website",
      content: [
        "You must be at least 18 years old to use this website.",
        "You agree to use this website for lawful purposes only.",
        "You are responsible for maintaining the confidentiality of your account and password.",
      ],
    },
    {
      title: "2. Account Registration",
      content: [
        "Users may need to create an account to access certain features.",
        "You are responsible for all activities conducted under your account.",
        "DailyMarketBD reserves the right to suspend or terminate accounts violating the rules.",
      ],
    },
    {
      title: "3. Products and Services",
      content: [
        "DailyMarketBD is a marketplace platform for local market products.",
        "We do not manufacture or sell products directly; we only provide a platform for vendors and users.",
        "Product descriptions and prices are provided by vendors; we are not responsible for inaccuracies.",
      ],
    },
    {
      title: "4. Payments",
      content: [
        "Payments made through DailyMarketBD must be accurate and legitimate.",
        "We are not responsible for payment disputes outside our platform.",
        "Refunds and cancellations are subject to vendor policies.",
      ],
    },
    {
      title: "5. Intellectual Property",
      content: [
        "All content, logos, images, and branding on this website are owned by DailyMarketBD.",
        "You may not copy, distribute, or use any content without our written permission.",
      ],
    },
    {
      title: "6. Limitation of Liability",
      content: [
        "DailyMarketBD is not liable for any damages resulting from the use of this website. We do not guarantee uninterrupted access or error-free service.",
      ],
    },
    {
      title: "7. Privacy",
      content: [
        "Your use of this website is also governed by our Privacy Policy. By using this website, you consent to the collection and use of information as described in our Privacy Policy.",
      ],
    },
    {
      title: "8. Modifications",
      content: [
        "DailyMarketBD reserves the right to update or change these Terms and Conditions at any time. Users are encouraged to review the Terms regularly. Continued use after changes constitutes acceptance of the updated Terms.",
      ],
    },
    {
      title: "9. Governing Law",
      content: [
        "These Terms and Conditions are governed by the laws of Bangladesh. Any disputes will be subject to the jurisdiction of Bangladeshi courts.",
      ],
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-8 text-center"
          data-aos="fade-down"
        >
          Terms and Conditions
        </h1>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-emerald-500 mb-3">
                {section.title}
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {section.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          className="mt-10 text-gray-700 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          By using <span className="font-semibold">DailyMarketBD</span>, you
          acknowledge that you have read, understood, and agree to these Terms
          and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
