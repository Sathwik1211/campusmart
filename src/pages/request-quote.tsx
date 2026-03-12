import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const RequestQuote = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    requirement: '',
    budget: '',
    timeline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-cm-gray flex items-center justify-center py-4">
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-md w-full mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-cm-blue-dark mb-4">Quote Request Submitted!</h2>
          <p className="text-gray-600">We'll get back to you within 24 hours.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cm-gray py-4">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-cm-blue-dark mb-2 text-center">Request a Quote</h1>
          <p className="text-gray-600 text-center mb-2">Tell us about your requirements and we'll get back to you.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-input" required />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-input" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Phone *</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="form-input" required />
              </div>
              <div>
                <label className="form-label">Institution</label>
                <input type="text" value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} className="form-input" />
              </div>
            </div>
            <div>
              <label className="form-label">Requirements *</label>
              <textarea value={formData.requirement} onChange={(e) => setFormData({...formData, requirement: e.target.value})} className="form-input min-h-[120px]" placeholder="Describe your requirements..." required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Budget Range</label>
                <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="form-input">
                  <option value="">Select budget</option>
                  <option value="under-1l">Under ₹1 Lakh</option>
                  <option value="1-5l">₹1-5 Lakhs</option>
                  <option value="5-10l">₹5-10 Lakhs</option>
                  <option value="10-50l">₹10-50 Lakhs</option>
                  <option value="above-50l">Above ₹50 Lakhs</option>
                </select>
              </div>
              <div>
                <label className="form-label">Timeline</label>
                <select value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})} className="form-input">
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate</option>
                  <option value="1-3m">1-3 Months</option>
                  <option value="3-6m">3-6 Months</option>
                  <option value="6-12m">6-12 Months</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RequestQuote;
