'use client'
import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const barData = {
  labels: ["Candidate A", "Candidate B", "Candidate C", "Candidate D"],
  datasets: [{
    label: "Votes",
    data: [320, 250, 480, 590],
    backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#8b5cf6"],
    borderRadius: 4,
  }],
};

const lineData = {
  labels: ["10am", "12pm", "2pm", "4pm", "6pm"],
  datasets: [{
    label: "Votes Over Time",
    data: [50, 120, 200, 300, 450],
    fill: true,
    borderColor: "#8b5cf6",
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    tension: 0.4,
  }],
};

const pieData = {
  labels: ["Level 100", "Level 200", "Level 300", "Level 400"],
  datasets: [{
    data: [350, 150, 220, 180],
    backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#8b5cf6"],
    borderWidth: 0,
  }],
};

const doughnutData = {
  labels: ["Voted", "Not Voted"],
  datasets: [{
    data: [820, 180],
    backgroundColor: ["#22d3ee", "#f59e0b"],
    borderWidth: 0,
  }],
};


export default function ResultsVisualization() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Results Visualization</h2>
        <p className="mt-1 text-slate-500">Visualize election results with various charts.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Votes per Candidate</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Vote Trend</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Voter Demographics by Level</h3>
          <div className="h-64 flex justify-center">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Overall Voter Turnout</h3>
          <div className="h-64 flex justify-center">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}