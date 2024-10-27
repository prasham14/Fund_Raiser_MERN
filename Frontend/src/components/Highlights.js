import React from 'react';
// import { SettingsSuggestIcon, ConstructionIcon, ThumbUpAltIcon, AutoFixHighIcon, SupportAgentIcon, QueryStatsIcon } from '@mui/icons-material';
const items = [
  {
    // icon: <SettingsSuggestIcon className="opacity-50 text-white" />,
    title: 'Raise Your fund easily',
    description: 'You can easily start a fundRaiser and it will be shown to every user on this platform .',
  },
  {
    // icon: <ConstructionIcon className="opacity-50 text-white" />,
    title: 'Optimized Time Management',
    description: 'Maximize productivity with schedules designed to make the most of your time, helping you reach milestones efficiently.',
  },
  {
    // icon: <ThumbUpAltIcon className="opacity-50 text-white" />,
    title: 'Dynamic Scheduling',
    description: 'Adapt easily to changing priorities—our system updates your schedule in real-time to keep you on track.',
  },
  {
    // icon: <AutoFixHighIcon className="opacity-50 text-white" />,
    title: 'Progress Insights',
    description: 'Gain valuable insights into your performance with detailed progress reports and time analytics that guide your journey.',
  },
  {
    // icon: <SupportAgentIcon className="opacity-50 text-white" />,
    title: 'Seamless Goal Integration',
    description: 'Easily set goals and see them transformed into actionable plans, making big dreams achievable step by step.',
  },
  {
    // icon: <QueryStatsIcon className="opacity-50 text-white" />,
    title: 'Boosted Productivity',
    description: 'Focus on what matters most by eliminating distractions and following a clear, organized roadmap to success.',
  },
];

export default function Highlights() {
  return (
    <div id="highlights" className="bg-[#001512] text-white py-8 sm:py-16">
      <div className="container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <div className="w-full sm:w-4/5 md:w-3/5 text-center sm:text-left">
          <h2 className="text-3xl font-bold mb-4 flex justify-center items-center">What to do ? </h2>
          <p className="text-gray-400 text-center">
            Explore why our platform stands out: adaptability, durability, user-friendly design, and innovation. Enjoy reliable customer support and precision in every detail.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-customBlue p-6 rounded-lg border border-gray-700 flex flex-col items-start max-w-[400px]">
              {/* <div className="mb-4">{item.icon}</div> */}
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
