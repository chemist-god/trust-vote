import React, { useState, useEffect } from 'react';

interface Candidate {
    id: string;
    name: string;
    position: string;
    status: string;
    avatar: string;
    program: string;
    manifesto: string;
    studentInfo: string;
    socialLinks: { [key: string]: string };
    feedback: string;
    photo: string;
}

interface CandidateReviewModalProps {
    open: boolean;
    onClose: () => void;
    candidate: Candidate | null;
    onApprove: (feedback: string) => void;
    onReject: (feedback: string) => void;
}

const CandidateReviewModal: React.FC<CandidateReviewModalProps> = ({ open, onClose, candidate, onApprove, onReject }) => {
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open || !candidate) return null;

    const isPdf = candidate.manifesto.endsWith('.pdf');
    const isMd = candidate.manifesto.endsWith('.md');

    return (
        <>
            {/* Blurred Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            {/* Right Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-full sm:max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ width: '100%', maxWidth: '480px' }}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center gap-4">
                            <img src={candidate.photo} alt={candidate.name} className="w-16 h-16 rounded-full object-cover border" />
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 mb-0.5">{candidate.name}</h2>
                                <p className="text-slate-600 text-sm">{candidate.position}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl ml-2">&times;</button>
                    </div>
                    {/* Details */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-700">Program:</span>
                                <span className="text-slate-600">{candidate.program}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-700">Student Info:</span>
                                <span className="text-slate-600">{candidate.studentInfo}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-slate-700">Social Links:</span>
                                {Object.entries(candidate.socialLinks).map(([key, url]) =>
                                    url ? (
                                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs mr-2">{key}</a>
                                    ) : null
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Manifesto</h3>
                            {isPdf ? (
                                <iframe
                                    src={candidate.manifesto}
                                    title="Manifesto PDF"
                                    className="w-full h-64 border rounded"
                                />
                            ) : isMd ? (
                                <div className="bg-slate-50 p-3 rounded border text-xs text-slate-700">
                                    {/* Markdown rendering can be added here if needed */}
                                    <span>Markdown preview not implemented.</span>
                                </div>
                            ) : (
                                <a href={candidate.manifesto} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Manifesto</a>
                            )}
                        </div>
                        <div>
                            <label className="block text-slate-700 font-medium mb-1">Feedback (optional)</label>
                            <textarea
                                className="w-full border rounded p-2 text-sm "
                                rows={3}
                                value={feedback}
                                onChange={e => setFeedback(e.target.value)}
                                placeholder="Add feedback for the candidate (optional)"
                            />
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-2 p-6 border-t bg-white">
                        <button
                            onClick={() => { onReject(feedback); setFeedback(''); }}
                            className="px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 font-medium"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => { onApprove(feedback); setFeedback(''); }}
                            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium"
                        >
                            Approve
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CandidateReviewModal; 