import React, { useState, useEffect } from 'react';
import { X, Edit2, Trash2, Plus, Check, XCircle } from 'lucide-react';

const SurahAyatModal = ({ surah, onClose, onSave }) => {
  const [ayats, setAyats] = useState(surah.ayats || []);
  const [newAyat, setNewAyat] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Sync local ayats when surah changes
  useEffect(() => {
    setAyats(surah.ayats || []);
  }, [surah]);

  // Add new Ayat
  const handleAddAyat = () => {
    if (newAyat.trim()) {
      const updated = [...ayats, newAyat];
      setAyats(updated);
      setNewAyat('');
      onSave(updated); 
    }
  };

  // Delete an Ayat
  const handleDelete = (index) => {
    const updated = ayats.filter((_, i) => i !== index);
    setAyats(updated);
    onSave(updated);
  };

  // Start editing an Ayat
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(ayats[index]);
  };

  // Save edited Ayat
  const handleSaveEdit = () => {
    const updated = [...ayats];
    updated[editingIndex] = editText;
    setAyats(updated);
    setEditingIndex(null);
    setEditText('');
    onSave(updated); // Update parent
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto px-2 sm:px-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md sm:max-w-2xl shadow-lg relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-teal-700 text-lg sm:text-xl font-semibold">{surah.english}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500"><X size={22} /></button>
        </div>

        {/* Surah Info */}
        <h3 className="text-2xl sm:text-3xl mb-3 text-gray-500" style={{ direction: 'rtl' }}>{surah.arabic}</h3>
        <p className="text-teal-600 mb-4 text-sm sm:text-base">{surah.malayalam}</p>

        {/* Add New Ayat */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newAyat}
            onChange={(e) => setNewAyat(e.target.value)}
            placeholder=""
            className="flex-1 border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
            style={{ direction: 'rtl' }}
          />
          <button
            onClick={handleAddAyat}
            className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Ayat List */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3">
          {ayats.length === 0 ? (
            <p className="text-gray-400 text-center py-6 text-sm sm:text-base">No ayats added yet.</p>
          ) : (
            ayats.map((ayat, index) => (
              <div
                key={index}
                className="flex items-start justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow transition"
              >
                <div className="flex-1 min-w-0">
                  {/* Ayat Number */}
                  <span className="text-gray-400 text-xs sm:text-sm">Ayat {index + 1}</span>

                  {/* Ayat Text or Edit Input */}
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border rounded-lg px-2 py-1 mt-1 text-sm sm:text-base focus:ring-2 focus:ring-teal-400"
                      style={{ direction: 'rtl' }}
                    />
                  ) : (
                    <p className="text-gray-700 mt-1 text-sm sm:text-base" style={{ direction: 'rtl' }}>
                      {ayat}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {editingIndex === index ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:bg-green-50 p-1 rounded transition"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-gray-400 hover:bg-gray-100 p-1 rounded transition"
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-500 hover:bg-blue-50 p-1 rounded transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SurahAyatModal;
