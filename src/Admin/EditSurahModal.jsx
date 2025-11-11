import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditSurahModal = ({ surah, onClose, onSave }) => {
  const [arabic, setArabic] = useState(surah.arabic);
  const [malayalam, setMalayalam] = useState(surah.malayalam);
  const [english, setEnglish] = useState(surah.english);

  useEffect(() => {
    setArabic(surah.arabic);
    setMalayalam(surah.malayalam);
    setEnglish(surah.english);
  }, [surah]);

  const handleSubmit = () => {
    if (arabic && malayalam && english) {
      onSave({ ...surah, arabic, malayalam, english });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3">
      <div className="bg-white p-5 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700">
            Edit Surah
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X />
          </button>
        </div>

        <input
          type="text"
          placeholder="Arabic Name"
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Malayalam Name"
          value={malayalam}
          onChange={(e) => setMalayalam(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="English Name"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Update Surah
        </button>
      </div>
    </div>
  );
};

export default EditSurahModal;
