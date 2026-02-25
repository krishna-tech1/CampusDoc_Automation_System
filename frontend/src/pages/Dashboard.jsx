import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FilePlus, ClipboardCheck, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const docTypes = [
        {
            title: 'Circular',
            description: 'Official announcements and notices for departments or students.',
            icon: <FileText className="text-indigo-400" size={32} />,
            path: '/circular',
            color: 'indigo'
        },
        {
            title: 'Proposal',
            description: 'Request formal approval and budget for upcoming college events.',
            icon: <FilePlus className="text-purple-400" size={32} />,
            path: '/proposal',
            color: 'purple'
        },
        {
            title: 'Event Report',
            description: 'Post-event documentation including outcomes and feedback.',
            icon: <ClipboardCheck className="text-emerald-400" size={32} />,
            path: '/report',
            color: 'emerald'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">Select a document type to automate your workflow.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                {docTypes.map((doc) => (
                    <div
                        key={doc.title}
                        className="glass group p-8 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 cursor-pointer border-transparent hover:border-indigo-500/30"
                        onClick={() => navigate(doc.path)}
                    >
                        <div className="mb-6 p-4 rounded-xl bg-slate-800/50 w-fit group-hover:scale-110 transition-transform duration-300">
                            {doc.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{doc.title}</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed">{doc.description}</p>
                        <div className="flex items-center gap-2 text-indigo-400 font-semibold group-hover:gap-4 transition-all">
                            Create Now <ArrowRight size={18} />
                        </div>
                    </div>
                ))}
            </div>

            <section className="mt-12">
                <div className="glass p-8 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-transparent border-indigo-500/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Automated Document History</h2>
                            <p className="text-slate-400">Access and download all previously generated documents in one place.</p>
                        </div>
                        <button
                            onClick={() => navigate('/history')}
                            className="btn-primary whitespace-nowrap"
                        >
                            View History
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
