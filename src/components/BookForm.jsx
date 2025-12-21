import { useState, useEffect } from 'react';
import { bookAPI } from '../services/api';
import { X, BookOpen, PlusCircle, Edit3, Save } from 'lucide-react';

function BookForm({ book, onClose, onSuccess }) {
  // --- KEEPING YOUR EXACT LOGIC ---
  const [formData, setFormData] = useState({
    bookName: '',
    bookTitle: '',
    author: '',
    sellingPrice: '',
    publishDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) {
      setFormData({
        bookName: book.bookName || '',
        bookTitle: book.bookTitle || '',
        author: book.author || '',
        sellingPrice: book.sellingPrice || '',
        publishDate: book.publishDate
          ? book.publishDate.split('T')[0]
          : ''
      });
    } else {
      setFormData({
        bookName: '',
        bookTitle: '',
        author: '',
        sellingPrice: '',
        publishDate: ''
      });
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (book) {
        await bookAPI.update(book.id, formData);
      } else {
        await bookAPI.create(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError('Error saving book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // --- END OF LOGIC SECTION ---

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              {book ? <Edit3 className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">
                {book ? 'Edit Book Record' : 'Add New Entry'}
              </h2>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">
                Library Management System
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-slate-50/50">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-center gap-3 animate-shake">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Book Name</label>
              <input
                className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                name="bookName"
                placeholder="Book name"
                value={formData.bookName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Title</label>
              <input
                className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                name="bookTitle"
                placeholder="Title"
                value={formData.bookTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Author</label>
              <input
                className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                name="author"
                placeholder="writer"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5"> Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
                name="sellingPrice"
                placeholder="Price"
                value={formData.sellingPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Purchased Date</label>
              <input
                type="date"
                className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-slate-600"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                loading 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {book ? 'Update Records' : 'Save Book'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;