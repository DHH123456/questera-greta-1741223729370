import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectForm from './components/ProjectForm';
import FileUpload from './components/FileUpload';
import AnalysisStatus from './components/AnalysisStatus';
import AnalysisResults from './components/AnalysisResults';
import InteractionPanel from './components/InteractionPanel';

function App() {
  const [projectInfo, setProjectInfo] = useState(null);
  const [files, setFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleProjectSubmit = (data) => {
    setProjectInfo(data);
  };

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleSubmitAnalysis = async () => {
    if (files.length === 0) {
      alert('请先上传文件');
      return;
    }

    setIsAnalyzing(true);

    // 模拟API调用和分析过程
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisData({
        frequencies: [30, 50, 70, 90, 110],
        measurements: [40, 45, 42, 48, 44],
        limits: [50, 50, 50, 50, 50],
        summary: `项目 ${projectInfo.projectId} 的EMI分析已完成。根据分析结果，当前EMI指标整体符合要求，部分频段需要进行优化。`
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          奥海EMI数据分析平台
        </motion.h1>

        {!projectInfo ? (
          <ProjectForm onSubmit={handleProjectSubmit} />
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">项目信息</h2>
              <p>项目编号: {projectInfo.projectId}</p>
              <p>负责人: {projectInfo.manager}</p>
            </div>

            {!analysisData && (
              <>
                <FileUpload onUpload={handleFileUpload} />
                {files.length > 0 && !isAnalyzing && (
                  <div className="text-center">
                    <button
                      onClick={handleSubmitAnalysis}
                      className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      提交分析
                    </button>
                  </div>
                )}
              </>
            )}

            {isAnalyzing && <AnalysisStatus />}
            {analysisData && (
              <>
                <AnalysisResults data={analysisData} />
                <InteractionPanel />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;