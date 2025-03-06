import React from 'react';
import { motion } from 'framer-motion';

const ProjectForm = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    projectId: '',
    manager: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          项目编号
        </label>
        <input
          type="text"
          name="projectId"
          required
          placeholder="例如: A666"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          value={formData.projectId}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          负责人
        </label>
        <input
          type="text"
          name="manager"
          required
          placeholder="请输入负责人姓名"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          value={formData.manager}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        确认
      </button>
    </motion.form>
  );
};

export default ProjectForm;