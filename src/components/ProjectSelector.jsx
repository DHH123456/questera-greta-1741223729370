import React from 'react';
import { motion } from 'framer-motion';

const ProjectSelector = ({ onSelect }) => {
  const projects = [
    { id: 'A666', name: 'A666项目' },
    { id: 'B888', name: 'B888项目' },
    { id: 'C999', name: 'C999项目' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto mb-8"
    >
      <label className="block text-lg font-semibold text-white mb-2">
        选择项目
      </label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-3 rounded-lg bg-white border border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
      >
        <option value="">请选择项目</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default ProjectSelector;