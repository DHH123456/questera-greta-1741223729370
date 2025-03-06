import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiMicOff, FiSend, FiPaperclip, FiX } from 'react-icons/fi';

const InteractionPanel = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      return '只支持Excel文件和图片格式';
    }
    if (file.size > maxSize) {
      return '文件大小不能超过50MB';
    }
    return null;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = [];
    let hasError = false;

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        alert(error);
        hasError = true;
        return;
      }
      newAttachments.push(file);
    });

    if (!hasError) {
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;

    const newMessage = {
      text: message,
      files: attachments,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    
    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = {
        text: "我已收到您的消息和附件。根据分析，该频段的EMI干扰主要来源于开关电源，建议增加EMI滤波器来降低干扰。",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setMessage('');
    setAttachments([]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // 这里添加实际的语音识别逻辑
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
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
      className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4 bg-primary text-white">
        <h3 className="text-lg font-semibold">分析结果交互</h3>
      </div>

      <div className="h-64 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
              {msg.files && msg.files.length > 0 && (
                <div className="mt-2 border-t border-white/20 pt-2">
                  <p className="text-sm">附件：</p>
                  {msg.files.map((file, fileIndex) => (
                    <div key={fileIndex} className="flex items-center gap-2 mt-1">
                      <span>{getFileIcon(file.name)}</span>
                      <span className="text-sm">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        {attachments.length > 0 && (
          <div className="mb-3 p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 mb-2">已选择的文件：</p>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm"
                >
                  <span>{getFileIcon(file.name)}</span>
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2 rounded-full ${
              isRecording ? 'bg-red-500' : 'bg-gray-200'
            } text-white`}
          >
            {isRecording ? <FiMicOff /> : <FiMic />}
          </button>
          
          <label className="p-2 bg-gray-200 rounded-full text-gray-600 cursor-pointer hover:bg-gray-300">
            <FiPaperclip />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".xlsx,.xls,image/*"
            />
          </label>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="输入您的问题或建议..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          
          <button
            type="submit"
            className="bg-accent text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiSend />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default InteractionPanel;