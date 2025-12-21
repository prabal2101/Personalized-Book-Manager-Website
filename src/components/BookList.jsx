import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookAPI } from '../services/api';
import { Plus, LogOut, Search, Trash2, Edit, BookOpen, User, Calendar, Tag } from 'lucide-react';
import BookForm from './BookForm';

function BookList() {
  // --- KEEPING YOUR EXACT LOGIC ---
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookAPI.getAll();
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await bookAPI.delete(id);
      fetchBooks();
    } catch {
      alert('Error deleting book');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(search.toLowerCase()) ||
    book.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );
  // --- END OF LOGIC SECTION ---

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* MODERN HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Book Manager</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium uppercase">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Admin Dashboard
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-slate-700">{user?.email?.split('@')[0]}</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{isAdmin ? 'Administrator' : 'Staff'}</p>
            </div>
            <button 
              onClick={logout} 
              className="group flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 font-semibold transition-colors border border-transparent hover:border-red-100 hover:bg-red-50 rounded-xl"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> 
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
        {/* ACTION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, or name..."
              className="w-full bg-white border border-slate-200 pl-12 pr-4 py-3 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
            />
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setEditingBook(null);
                setShowForm(true);
              }}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Book</span>
            </button>
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-500 font-medium">Loading catalog data...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No books found</h3>
              <p className="text-slate-500">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Book Identity</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Author & Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Purchased Date</th>
                    {isAdmin && <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Management</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-800">{book.bookTitle}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 italic">
                           <Tag className="w-3 h-3" /> {book.bookName}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <User className="w-4 h-4 text-slate-400" /> {book.author}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold text-sm border border-green-100">
                          ₹{Number(book.sellingPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(book.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(book)}
                              className="p-2 bg-white text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white rounded-xl shadow-sm transition-all active:scale-90"
                              title="Edit Record"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="p-2 bg-white text-red-600 border border-red-100 hover:bg-red-600 hover:text-white rounded-xl shadow-sm transition-all active:scale-90"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <BookForm
          book={editingBook}
          onClose={handleFormClose}
          onSuccess={fetchBooks}
        />
      )}
    </div>
  );
}

export default BookList;