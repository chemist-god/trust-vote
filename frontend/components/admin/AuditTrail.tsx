import { FaUserClock, FaVoteYea, FaFileSignature, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const auditEvents = [
  {
    id: 1,
    icon: FaUserClock,
    text: "Admin 'admin' logged in from IP 192.168.1.1",
    time: "2 mins ago",
    user: "system",
    bgColor: "bg-slate-100",
    iconColor: "text-slate-500",
  },
  {
    id: 2,
    icon: FaVoteYea,
    text: "Vote cast by wallet 0x123...abc for candidate 'John Doe'",
    time: "5 mins ago",
    user: "blockchain",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    icon: FaUserCheck,
    text: "Candidate 'Jane Smith' was approved by 'admin'",
    time: "30 mins ago",
    user: "admin",
    bgColor: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    id: 4,
    icon: FaFileSignature,
    text: "Election 'SRC President' was finalized.",
    time: "1 hour ago",
    user: "admin",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    id: 5,
    icon: FaUserTimes,
    text: "Candidate 'Peter Jones' was rejected by 'admin'",
    time: "2 hours ago",
    user: "admin",
    bgColor: "bg-red-100",
    iconColor: "text-red-500",
  },
];

export default function AuditTrail() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Audit Trail</h2>
        <p className="mt-1 text-slate-500">Track all significant actions and events in the system.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {auditEvents.map((event, eventIdx) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== auditEvents.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-start space-x-4">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${event.bgColor}`}>
                      <event.icon className={`h-5 w-5 ${event.iconColor}`} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <p className="text-sm text-slate-600">{event.text}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        <span>{event.time}</span> &middot; <span>by {event.user}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}