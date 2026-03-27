import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId }) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  return (
    <div className="w-full  mx-auto mt-8 overflow-hidden ">
      <div className="flex border-b-2 mb-12 border-gray-200 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 focus:outline-none
              ${activeTab === tab.id 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:bg-gray-100'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="">
        {tabs.map((tab) => (
          <div 
            key={tab.id} 
            className={`pb-4 ${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;