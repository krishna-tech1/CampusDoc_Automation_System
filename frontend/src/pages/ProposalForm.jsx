import React, { useState } from 'react';
import api, { API_BASE_URL } from '../utils/api';
import { FilePlus, Download, Loader2, CheckCircle2 } from 'lucide-react';

const ProposalForm = () => {
    const [formData, setFormData] = useState({
        proposal_title: '',
        event_name: '',
        date_venue: '',
        objectives: '',
        budget_details: '',
        coordinator_name: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        try {
            const response = await api.post('/documents/generate/proposal', formData);
            setSuccess(response.data);
        } catch (err) {
            alert('Error generating proposal: ' + (err.response?.data?.detail || err.message));
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
                <div className="p-3 bg-purple-600/20 rounded-xl">
                    <FilePlus className="text-purple-400" size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">New Event Proposal</h1>
                    <p className="text-slate-400">Describe the event and budget requirements.</p>
                </div>
            </header>

            {success ? (
                <div className="glass p-12 rounded-3xl text-center space-y-6 border-emerald-500/30">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-emerald-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Proposal Generated!</h2>
                    <p className="text-slate-400">The proposal document is ready for download.</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => setSuccess(null)} className="px-6 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                            Create Another
                        </button>
                        <button onClick={handleDownload} className="btn-primary flex items-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-purple-500/30">
                            <Download size={20} /> Download Word
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Proposal Title</label>
                        <input
                            required
                            className="input-field w-full"
                            placeholder="e.g. Budget Proposal for Annual Tech Fest"
                            value={formData.proposal_title}
                            onChange={e => setFormData({ ...formData, proposal_title: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Event Name</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="e.g. Hackathon 2024"
                                value={formData.event_name}
                                onChange={e => setFormData({ ...formData, event_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Date & Venue</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="e.g. 15th April, Main Auditiorium"
                                value={formData.date_venue}
                                onChange={e => setFormData({ ...formData, date_venue: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Event Objectives</label>
                        <textarea
                            required
                            rows={3}
                            className="input-field w-full resize-none"
                            placeholder="What are the goals of this event?"
                            value={formData.objectives}
                            onChange={e => setFormData({ ...formData, objectives: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Budget Details</label>
                        <textarea
                            required
                            rows={3}
                            className="input-field w-full resize-none"
                            placeholder="Itemize the expected expenses..."
                            value={formData.budget_details}
                            onChange={e => setFormData({ ...formData, budget_details: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Coordinator Name</label>
                        <input
                            required
                            className="input-field w-full"
                            placeholder="e.g. Prof. Alan Turing"
                            value={formData.coordinator_name}
                            onChange={e => setFormData({ ...formData, coordinator_name: e.target.value })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg bg-purple-600 hover:bg-purple-700"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Generate Proposal Document'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProposalForm;
