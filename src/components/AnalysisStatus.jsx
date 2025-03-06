import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const AnalysisStatus = ({ status }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow text-center"
    >
      <FiLoader className="animate-spin text-4xl text-accent mx-auto mb-4" />
      <p className="text-gray-700">
        正在分析数据，请稍候...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        预计需要3-5分钟完成分析
      </p>
    </motion.div>
  );
};

export default AnalysisStatus;