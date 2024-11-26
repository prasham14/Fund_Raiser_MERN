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
  {
    question: "What is an initiative, and how does it work?",
    answer:
      "An initiative is a collaborative effort where users can create or join community-driven projects focused on specific causes. Initiatives allow people to contribute their skills, resources, and funds to make a larger impact together.",
  },
  {
    question: "How can I create an initiative?",
    answer:
      "Creating an initiative is easy. Log in, go to the 'Initiatives' section, and click 'Create Initiative.' Fill out details about the cause, set goals, and publish it. You can then invite others to join and support the initiative.",
  },
  {
    question: "Can I participate in other initiatives?",
    answer:
      "Yes, you can join existing initiatives on our platform. Browse through the initiatives, choose one that aligns with your interests, and click 'Participate' to contribute your support or resources.",
  },
  {
    question: "Can I manage both fundraisers and initiatives simultaneously?",
    answer:
      "Absolutely. Our platform is designed to allow users to manage both personal fundraisers and initiatives at the same time. Each will have its own dashboard, so you can easily track progress and updates for both types of campaigns.",
  },
  {
    question: "Are there guidelines for creating an initiative?",
    answer:
      "Yes, we provide guidelines to ensure initiatives are well-structured, achievable, and align with our community standards. These guidelines help ensure each initiative has a clear mission, transparency, and a positive impact.",
  },
  {
    question: "How do I invite others to join my initiative?",
    answer:
      "Once you've created an initiative, you can share it through social media, email, or direct links. The platform also provides built-in tools to help you invite friends, family, and supporters to participate.",
  },
  {
    question: "Can I track the progress of an initiative?",
    answer:
      "Yes, each initiative has a dedicated progress page where you can view updates, milestones, and participant contributions. This helps keep everyone informed and motivated towards reaching the goal.",
  },
  {
    question: "What types of initiatives can be created on the platform?",
    answer:
      "You can create initiatives for various causes, including community improvement, environmental efforts, educational projects, and health campaigns. We encourage any initiative that promotes positive social impact.",
  },
  {
    question: "Is there a limit to the number of participants in an initiative?",
    answer:
      "No, there is no set limit. You can invite as many people as you like to join your initiative. The more participants, the greater the collective impact.",
  },
  {
    question: "Can I make a donation to an initiative without participating directly?",
    answer:
      "Yes, if you want to support an initiative financially without actively participating, you can make a one-time or recurring donation to the initiative of your choice.",
  },
  {
    question: "What support resources are available if I have questions?",
    answer:
      "Our platform offers a help center with articles and FAQs, and our support team is available to assist you via chat or email if you need further assistance.",
  },
  {
    question: "How are funds allocated within an initiative?",
    answer:
      "The funds raised within an initiative are allocated according to the initiative’s stated goals and managed by the initiative's organizer, ensuring transparency and accountability for all contributors.",
  },
  {
    question: "Can I end or pause my fundraiser or initiative?",
    answer:
      "Yes, you can end or pause your fundraiser or initiative at any time through your dashboard. This is useful if you reach your goal early or need a break in activity.",
  },
];


export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="bg-white text-gray-800 py-8 sm:py-16">
      <div className="container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <div className="w-full sm:w-4/5 md:w-3/5 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-teal-600  flex justify-center sm:justify-start items-center">
            Frequently Asked Questions (FAQs)
          </h2>
        </div>

        <div className="max-w-[800px] w-full ">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white p-2  border-gray-300 shadow-sm mb-4 hover:shadow-md transition-shadow duration-300"
            >
              {/* Question and Icon Section */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-lg font-medium text-black focus:outline-none"
              >
                {/* Question */}
                <span className="text-left">{item.question}</span>

                {/* Icon on the Right */}
                {openIndex === index ? (
                  <FaChevronUp className="text-teal-400" />
                ) : (
                  <FaChevronDown className="text-teal-400" />
                )}
              </button>

              {/* Answer Section with Transition */}
              <div
                className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-60 mt-4' : 'max-h-0'
                  }`}
              >
                <p className="text-gray-600 text-sm mt-2">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
