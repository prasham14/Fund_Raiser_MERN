import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Chevron icons

const questions = [
  {
    question: "What is this fundraising platform for?",
    answer:
      "Our platform is designed to help individuals, NGOs, and community projects raise funds for their causes. It provides tools for setting up, sharing, and managing campaigns effectively, allowing you to connect with supporters who care about making a difference.",
  },
  {
    question: "How can I start a fundraiser?",
    answer:
      "Starting a fundraiser is simple. Sign up or log in, click on 'Start a Fundraiser,' fill out the details about your cause, and publish it. Your fundraiser will then be visible to potential donors on our platform.",
  },
  {
    question: "Are there any fees for using this platform?",
    answer:
      "While creating a fundraiser is free, a small platform fee and transaction fee are deducted from each donation to cover operational costs. We are transparent about these charges and aim to keep them minimal to ensure maximum funds go towards your cause.",
  },
  {
    question: "How can I withdraw the funds raised?",
    answer:
      "Once your fundraiser receives donations, you can initiate a withdrawal request. Funds will be securely transferred to your provided account after a brief verification process to ensure donor security.",
  },
  {
    question: "Can I run multiple fundraisers at the same time?",
    answer:
      "Yes, our platform allows users to run multiple fundraisers for different causes. Each fundraiser will have its own page, and you can track donations and progress separately for each.",
  },
  {
    question: "How do donors know their contributions are secure?",
    answer:
      "We prioritize donor security by using a secure payment gateway, keeping donor information confidential, and ensuring transparency in fund allocation. Donors receive confirmation of their contributions and can follow the progress of the campaigns they support.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="bg-[#001512] text-white py-8 sm:py-16">
      <div className="container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <div className="w-full sm:w-4/5 md:w-3/5 text-center sm:text-left">
          <h2 className="text-3xl font-bold mb-1 flex justify-center items-center">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-gray-700 max-w-[900px]">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-customBlue p-6 rounded-md border border-gray-700 mb-4"
            >
              {/* Question and Icon Section */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-lg font-medium focus:outline-none"
              >
                {/* Question */}
                <span className="text-left">{item.question}</span>

                {/* Icon on the Right */}
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-400" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>

              {/* Answer Section with Transition */}
              <div
                className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-60 mt-4' : 'max-h-0'
                  }`}
              >
                <p className="text-customBlue-400 text-sm">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
