import React from 'react';
import { Section } from '../types';

interface NavbarProps {
  sections: Section[];
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, selectedSectionId, onSelectSection }) => {
  return (
    <nav className="fixed left-0 top-0 h-full w-48 bg-gray-900 text-white p-4 shadow-lg overflow-y-auto z-10">
      <h2 className="text-xl font-bold mb-6 text-center text-blue-300">Sections</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id} className="mb-2">
            <button
              onClick={() => onSelectSection(section.id)}
              className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-200
                ${selectedSectionId === section.id
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
            >
              {section.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;