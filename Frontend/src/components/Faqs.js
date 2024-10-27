import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Chevron icons

const questions = [
  {
    question: "What is a Schedule Manager and Goal Tracker Website for?",
    answer:
      "A schedule manager and goal tracker website is a tool that helps users plan, organize, and track their daily tasks and long-term goals. It allows users to create schedules, set deadlines, allocate time for specific tasks, and track their progress towards achieving their goals.",
  },
  {
    question: "How does the AI-generated goal plan work?",
    answer:
      "Our platform uses AI to generate a personalized action plan based on your goals, available time, and deadlines. When you submit a goal along with the time you can dedicate each day, the AI creates a step-by-step schedule to help you achieve that goal within the set timeframe.",
  },
  {
    question: "Can I edit the AI-generated schedule?",
    answer:
      "Yes, after the AI generates a schedule for you, you can customize it to better fit your preferences. You can adjust the tasks, change the time allocation, or even add additional steps as per your needs.",
  },
  {
    question: "What happens if I’m not happy with the AI-generated plan?",
    answer:
      "If you're not satisfied with the AI-generated schedule, you have the option to regenerate a new plan. This allows you to explore different versions of the plan and select the one that suits you best..",
  },
  {
    question: "Can I track multiple goals at the same time?",
    answer:
      "Yes, our platform supports multi-goal tracking. You can create, monitor, and work towards several goals simultaneously. Each goal will have its own dedicated schedule and progress tracker.",
  },
  {
    question: "How can I track my progress?",
    answer:
      "Our platform offers a progress tracking feature that visually represents your goal completion. You can mark tasks as completed, and the platform will update your progress in real-time, showing you how close you are to achieving your goal.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="#" className="bg-[#001512] text-white py-8 sm:py-16">
      <div className="container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <div className="w-full sm:w-4/5 md:w-3/5 text-center sm:text-left">
          <h2 className="text-3xl font-bold mb-1 flex justify-center items-center">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="  border-gray-700 max-w-[900px]">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-customBlue p-6 rounded-md border border-gray-700 "
            >
              {/* Question and Icon Section */}
              {/* {noo change} */}
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
                style={{ overflow: 'hidden' }}
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
