import React, { useState } from 'react';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const validateFiles = (newFiles) => {
    const validFiles = [];
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png'
    ];

    for (const file of newFiles) {
      if (!allowedTypes.includes(file.type)) {
        setError('不支持的文件格式');
        return null;
      }
      if (file.size > maxSize) {
        setError('文件大小不能超过50MB');
        return null;
      }
      validFiles.push(file);
    }
    setError('');
    return validFiles;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = [...e.dataTransfer.files];
    const validFiles = validateFiles(droppedFiles);
    if (validFiles) {
      updateFiles(validFiles);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = [...e.target.files];
    const validFiles = validateFiles(selectedFiles);
    if (validFiles) {
      updateFiles(validFiles);
    }
  };

  const updateFiles = (newFiles) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📁';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-accent bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FiUploadCloud className="mx-auto text-5xl text-gray-400 mb-4" />
        <p className="text-lg mb-2">拖拽文件到此处或</p>
        <label className="bg-accent text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          选择文件
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept=".xlsx,.xls,.doc,.docx,.pdf,image/*"
          />
        </label>
        <p className="mt-2 text-sm text-gray-500">
          支持多个文件上传: Excel, Word, PDF, 图片 (最大50MB/文件)
        </p>
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-center">
          {error}
        </div>
      )}

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white rounded-lg p-4 shadow"
          >
            <h3 className="font-semibold mb-2">已选择的文件 ({files.length}):</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gray-50 p-3 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getFileIcon(file.name)}</span>
                    <span className="text-gray-700">{file.name}</span>
                    <span className="text-sm text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FiX />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileUpload;