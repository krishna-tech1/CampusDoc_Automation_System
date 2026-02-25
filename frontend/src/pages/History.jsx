import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { History as HistoryIcon, Download, Search, FileText, FilePlus, ClipboardCheck } from 'lucide-react';

const History = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await axios.get('/api/documents/history', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setDocs(response.data);
        } catch (err) {
            console.error('Error fetching history:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (id) => {
        window.open(`/api/documents/download/${id}?token=${localStorage.getItem('token')}`, '_blank');
    };

    const filteredDocs = docs.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.reference_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getIcon = (type) => {
        switch (type) {
            case 'circular': return <FileText className="text-indigo-400" size={20} />;
            case 'proposal': return <FilePlus className="text-purple-400" size={20} />;
            case 'report': return <ClipboardCheck className="text-emerald-400" size={20} />;
            default: return <FileText size={20} />;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <HistoryIcon className="text-indigo-500" /> Document History
                    </h1>
                    <p className="text-slate-400 mt-1">View and download all your previously generated documents.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="input-field pl-10 w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="glass rounded-2xl overflow-hidden border-slate-800">
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-slate-400 font-medium">Type</th>
                            <th className="px-6 py-4 text-slate-400 font-medium">Title & Ref</th>
                            <th className="px-6 py-4 text-slate-400 font-medium">Created At</th>
                            <th className="px-6 py-4 text-slate-400 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-6 py-8 h-16 bg-slate-900/20"></td>
                                </tr>
                            ))
                        ) : filteredDocs.length > 0 ? (
                            filteredDocs.map((doc) => (
                                <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 capitalize">
                                        <div className="flex items-center gap-3">
                                            {getIcon(doc.document_type)}
                                            <span className="text-slate-200">{doc.document_type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-white">{doc.title}</div>
                                        <div className="text-xs text-slate-500 font-mono mt-1">{doc.reference_number}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {new Date(doc.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDownload(doc.id)}
                                            className="p-2 hover:bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 rounded-lg transition-all"
                                            title="Download"
                                        >
                                            <Download size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                                    No documents found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
