import { Bar, Line, Pie } from "react-chartjs-2";
import { useState } from "react";
import { FaPlus, FaClock, FaCalendar } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

// Mock Data - can be replaced with API data
const barData = {
  labels: ["Level 100", "Level 200", "Level 300", "Level 400"],
  datasets: [{
    label: "Votes Cast",
    data: [120, 150, 180, 90],
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  }],
};

const lineData = {
  labels: ["10am", "12pm", "2pm", "4pm", "6pm"],
  datasets: [{
    label: "Votes Over Time",
    data: [50, 120, 200, 300, 350],
    fill: true,
    borderColor: "#8b5cf6",
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    tension: 0.4,
  }],
};

const pieData = {
  labels: ["Voted", "Not Voted"],
  datasets: [{
    data: [350, 150],
    backgroundColor: ["#22d3ee", "#f59e0b"],
    borderWidth: 0,
  }],
};

interface Election {
  id: string;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  voterCategories: string[];
  settings: {
    allowMultipleVotes: boolean;
    enableRealTimeResults: boolean;
    requireEmailVerification: boolean;
  };
}

// Modal for creating an election
function ElectionModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (election: Election) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    voterCategories: [] as string[],
    allowMultipleVotes: false,
    enableRealTimeResults: false,
    requireEmailVerification: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name.startsWith("category-")) {
      if (
        e.target instanceof HTMLInputElement &&
        e.target.type === "checkbox"
      ) {
        const checked = e.target.checked;
        setForm((prev) => ({
          ...prev,
          voterCategories: checked
            ? [...prev.voterCategories, value]
            : prev.voterCategories.filter((cat) => cat !== value),
        }));
      }
    } else if (type === "checkbox") {
      if (e.target instanceof HTMLInputElement) {
        const checked = e.target.checked;
        setForm((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: `EL${Date.now()}`,
      name: form.name,
      description: form.description,
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      voterCategories: form.voterCategories,
      settings: {
        allowMultipleVotes: form.allowMultipleVotes,
        enableRealTimeResults: form.enableRealTimeResults,
        requireEmailVerification: form.requireEmailVerification,
      },
    });
    setForm({
      name: "",
      type: "",
      description: "",
      startDate: "",
      endDate: "",
      voterCategories: [],
      allowMultipleVotes: false,
      enableRealTimeResults: false,
      requireEmailVerification: false,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-lg mx-2 max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Create New Election</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Election Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter election name"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Election Type
              </label>
              <select
                name="type"
                required
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select election type</option>
                <option value="student">Student Election</option>
                <option value="department">Department Election</option>
                <option value="faculty">Faculty Election</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              required
              value={form.description}
              onChange={handleChange}
              placeholder="Enter election description"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Date & Time
              </label>
              <input
                name="startDate"
                type="datetime-local"
                required
                value={form.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                End Date & Time
              </label>
              <input
                name="endDate"
                type="datetime-local"
                required
                value={form.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Voter Categories
              </label>
              <div className="space-y-1">
                {["Level 100", "Level 200", "Level 300", "Level 400"].map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`category-${level}`}
                      value={level}
                      checked={form.voterCategories.includes(level)}
                      onChange={handleChange}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Additional Settings
              </label>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="allowMultipleVotes"
                    checked={form.allowMultipleVotes}
                    onChange={handleChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Allow Multiple Votes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="enableRealTimeResults"
                    checked={form.enableRealTimeResults}
                    onChange={handleChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enable Real-time Results</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="requireEmailVerification"
                    checked={form.requireEmailVerification}
                    onChange={handleChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Require Email Verification</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Election summary card
function ElectionSummary({ election }: { election: Election }) {
  return (
    <div className="border rounded-lg p-4 bg-blue-50 shadow transition-all">
      <h4 className="font-semibold text-lg text-blue-800">{election.name}</h4>
      <p className="text-slate-600 text-sm mt-1 line-clamp-2">
        {election.description.length > 80
          ? election.description.slice(0, 80) + "..."
          : election.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
        <span className="flex items-center gap-1">
          <FaCalendar /> Opened: {new Date(election.startDate).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <FaClock /> Closes: {new Date(election.endDate).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          Type: {election.type.charAt(0).toUpperCase() + election.type.slice(1)}
        </span>
        <span className="flex items-center gap-1">
          Categories: {election.voterCategories.join(", ")}
        </span>
      </div>
    </div>
  );
}

export default function VoterManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elections, setElections] = useState<Election[]>([]);
  const [lastCreated, setLastCreated] = useState<Election | null>(null);

  const handleSaveElection = (election: Election) => {
    setElections((prev) => [election, ...prev]);
    setLastCreated(election);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Voter Management</h2>
        <p className="mt-1 text-slate-500">Monitor voter analytics and manage the voter roll.</p>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="font-semibold text-slate-600 mb-4">Votes by Level</h4>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="font-semibold text-slate-600 mb-4">Votes Over Time</h4>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
          <h4 className="font-semibold text-slate-600 mb-4">Voter Turnout</h4>
          <div className="w-40 h-40">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
          <h4 className="font-semibold text-slate-600 mb-4">Total Voters</h4>
          <p className="text-5xl font-bold text-blue-600">500</p>
          <p className="text-slate-500 mt-2">Registered</p>
        </div>
      </div>

      {/* Elections List */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-lg font-semibold text-slate-800">Active Elections</h3>
          <button
            onClick={() => { setIsModalOpen(true); setLastCreated(null); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <FaPlus />
            <span>Create Election</span>
          </button>
        </div>

        {/* Show summary of last created election */}
        {lastCreated && (
          <div className="mb-4">
            <ElectionSummary election={lastCreated} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {elections.map((election) => (
            <div key={election.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              <h4 className="font-semibold text-lg text-slate-800">{election.name}</h4>
              <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                {election.description.length > 80
                  ? election.description.slice(0, 80) + "..."
                  : election.description}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <FaCalendar className="mr-2" />
                  <span>Opens: {new Date(election.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <FaClock className="mr-2" />
                  <span>Closes: {new Date(election.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Election Creation Modal */}
        <ElectionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveElection}
        />
      </div>
  );
}