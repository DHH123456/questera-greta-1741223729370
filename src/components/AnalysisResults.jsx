import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const AnalysisResults = ({ data }) => {
  const chartOption = {
    title: {
      text: 'EMI测试结果分析',
      textStyle: {
        color: '#1a365d'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['频率响应', '限值']
    },
    xAxis: {
      type: 'category',
      data: data?.frequencies || []
    },
    yAxis: {
      type: 'value',
      name: 'dBμV'
    },
    series: [
      {
        name: '频率响应',
        type: 'line',
        data: data?.measurements || [],
        smooth: true,
        lineStyle: {
          color: '#60a5fa'
        }
      },
      {
        name: '限值',
        type: 'line',
        data: data?.limits || [],
        lineStyle: {
          type: 'dashed',
          color: '#ef4444'
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">分析结果</h2>
      <div className="h-[400px]">
        <ReactECharts option={chartOption} style={{ height: '100%' }} />
      </div>
      {data?.summary && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">分析总结</h3>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}
    </motion.div>
  );
};

export default AnalysisResults;