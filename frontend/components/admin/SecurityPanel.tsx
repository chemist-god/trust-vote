import { FaShieldAlt, FaKey, FaUserLock, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const securityItems = [
  {
    icon: FaShieldAlt,
    title: "Smart Contract",
    status: "Active",
    statusColor: "text-green-500",
    action: "Configure",
    enabled: true,
  },
  {
    icon: FaKey,
    title: "API Keys",
    status: "2 Active",
    statusColor: "text-slate-500",
    action: "Manage Keys",
    enabled: true,
  },
  {
    icon: FaUserLock,
    title: "2FA Authentication",
    status: "Enabled",
    statusColor: "text-green-500",
    action: "Manage",
    enabled: true,
  },
];


export default function SecurityPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Security Panel</h2>
        <p className="mt-1 text-slate-500">Manage security settings and monitor for threats.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityItems.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-full bg-slate-100`}>
                  <item.icon className={`h-6 w-6 text-slate-600`} />
                </div>
                {item.enabled ? <FaToggleOn className="h-6 w-6 text-green-500 cursor-pointer" /> : <FaToggleOff className="h-6 w-6 text-slate-400 cursor-pointer" />}
              </div>
              <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
              <p className={`font-bold ${item.statusColor}`}>{item.status}</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-4 text-left">
              {item.action} &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}