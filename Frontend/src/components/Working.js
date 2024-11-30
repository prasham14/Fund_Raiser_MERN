import React from "react";
import img1 from "./images/download.jpeg";
function Working() {
  const steps = [
    {
      title: "Step 1: Create Your Fundraiser",
      description:
        "Sign up or log in to our platform, then click on 'Start a Fundraiser' to create your campaign. Describe your cause, set a goal, and add any relevant details to share your story with potential supporters.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Step 2: Share Your Campaign",
      description:
        "Once your fundraiser is live, share it on social media, through email, or with friends and family. The more you share, the more likely you are to reach supporters who care about your cause.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Step 3: Receive Donations",
      description:
        "Supporters can easily donate to your fundraiser. Each donation helps you get closer to your goal, and donors can track your progress in real-time on the campaign page.",
    },
    {
      title: "Step 4: Withdraw Funds",
      description:
        "When you're ready, you can withdraw the funds raised. Our secure transfer process ensures that the donations reach you safely, ready to support your cause.",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          How Fundraising Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img
                src={img1}
                alt={step.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-teal-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="inline-flex items-center justify-center w-full my-8">
          {/* Left Line */}
          <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />

          {/* Dots */}
          <div className="flex items-center justify-center space-x-2 mx-4">
            <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
          </div>
          {/* Right Line */}
          <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
      </div>

    </section>
  );
}

export default Working;
