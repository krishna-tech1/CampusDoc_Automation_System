import React, { useState } from 'react';
import api, { API_BASE_URL } from '../utils/api';
import { ClipboardCheck, Download, Loader2, CheckCircle2 } from 'lucide-react';

const ReportForm = () => {
    const [formData, setFormData] = useState({
        event_name: '',
        date: new Date().toISOString().split('T')[0],
        chief_guest: '',
        participants_count: '',
        description: '',
        outcome: '',
        prepared_by: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        try {
            const response = await api.post('/documents/generate/report', formData);
            setSuccess(response.data);
        } catch (err) {
            alert('Error generating report: ' + (err.response?.data?.detail || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        window.open(`${API_BASE_URL}/documents/download/${success.document.id}?token=${localStorage.getItem('token')}`, '_blank');
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-5 duration-500">
            <header className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600/20 rounded-xl">
                    <ClipboardCheck className="text-emerald-400" size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Event Report</h1>
                    <p className="text-slate-400">Summarize the event success and feedback.</p>
                </div>
            </header>

            {success ? (
                <div className="glass p-12 rounded-3xl text-center space-y-6 border-emerald-500/30">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-emerald-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Report Generated!</h2>
                    <p className="text-slate-400">The event report has been successfully created.</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => setSuccess(null)} className="px-6 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                            Create Another
                        </button>
                        <button onClick={handleDownload} className="btn-primary flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30">
                            <Download size={20} /> Download Word
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Event Name</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="e.g. Science Fair 2024"
                                value={formData.event_name}
                                onChange={e => setFormData({ ...formData, event_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Event Date</label>
                            <input
                                type="date"
                                required
                                className="input-field w-full"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Chief Guest</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="Name of chief guest"
                                value={formData.chief_guest}
                                onChange={e => setFormData({ ...formData, chief_guest: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Number of Participants</label>
                            <input
                                type="number"
                                required
                                className="input-field w-full"
                                placeholder="e.g. 150"
                                value={formData.participants_count}
                                onChange={e => setFormData({ ...formData, participants_count: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Event Description</label>
                        <textarea
                            required
                            rows={4}
                            className="input-field w-full resize-none"
                            placeholder="Brief overview of how the event went..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Outcome / Feedback</label>
                        <textarea
                            required
                            rows={3}
                            className="input-field w-full resize-none"
                            placeholder="What was the result or key takeaway?"
                            value={formData.outcome}
                            onChange={e => setFormData({ ...formData, outcome: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Prepared By</label>
                        <input
                            required
                            className="input-field w-full"
                            placeholder="Your Name"
                            value={formData.prepared_by}
                            onChange={e => setFormData({ ...formData, prepared_by: e.target.value })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Generate Event Report'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ReportForm;
