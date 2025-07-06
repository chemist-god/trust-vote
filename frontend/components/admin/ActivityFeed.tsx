import { FaVoteYea, FaUserPlus, FaFileAlt } from 'react-icons/fa';

const activities = [
  { icon: FaVoteYea, text: "0x8d3...ab2 Voted for SRC President", time: "12:20pm", color: "text-blue-500" },
  { icon: FaUserPlus, text: "Andrei Coman posted a new article", time: "09:20am", color: "text-green-500" },
  { icon: FaFileAlt, text: "Zack Wetass, combined Commented", time: "07:29am", color: "text-purple-500" },
  { icon: FaVoteYea, text: "New vote recorded on Sepolia network", time: "Yesterday", color: "text-blue-500" },
  { icon: FaUserPlus, text: "Candidate 'Jane Doe' verified", time: "Yesterday", color: "text-green-500" },
];

export default function ActivityFeed() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Election Updates</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                {index < activities.length - 1 && <div className="w-px h-full bg-slate-200" />}
            </div>
            <div>
              <p className="text-sm text-slate-600">{activity.text}</p>
              <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}