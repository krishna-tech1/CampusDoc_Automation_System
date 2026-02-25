import React, { useState } from 'react';
import api, { API_BASE_URL } from '../utils/api';
import { FileText, Download, Loader2, CheckCircle2 } from 'lucide-react';

const CircularForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        date: new Date().toISOString().split('T')[0],
        subject: '',
        content: '',
        signature_name: '',
        designation: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        try {
            const response = await api.post('/documents/generate/circular', formData);
            setSuccess(response.data);
        } catch (err) {
            alert('Error generating circular: ' + (err.response?.data?.detail || err.message));
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
                <div className="p-3 bg-indigo-600/20 rounded-xl">
                    <FileText className="text-indigo-400" size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Generate Circular</h1>
                    <p className="text-slate-400">Fill in the details below to create a formal circular.</p>
                </div>
            </header>

            {success ? (
                <div className="glass p-12 rounded-3xl text-center space-y-6 border-emerald-500/30">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-emerald-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Document Generated!</h2>
                    <p className="text-slate-400">The circular has been successfully created and stored in history.</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => setSuccess(null)} className="px-6 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                            Create Another
                        </button>
                        <button onClick={handleDownload} className="btn-primary flex items-center gap-2">
                            <Download size={20} /> Download Word
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Circular Title</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="e.g. Workshop on AI"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Department</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="e.g. Computer Science"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Circular Date</label>
                            <input
                                type="date"
                                required
                                className="input-field w-full"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Subject</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="Brief subject..."
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Content / Message</label>
                        <textarea
                            required
                            rows={5}
                            className="input-field w-full resize-none"
                            placeholder="Enter the main message of the circular..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Signature Name</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="e.g. Dr. Jane Doe"
                                value={formData.signature_name}
                                onChange={e => setFormData({ ...formData, signature_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Designation</label>
                            <input
                                required
                                className="input-field w-full"
                                placeholder="e.g. Head of Department"
                                value={formData.designation}
                                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Generate Circular Document'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CircularForm;
