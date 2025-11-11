// import React, { useState } from 'react';
// import { Search, Edit2, Trash2, ExternalLink, X, Plus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const SurahManagementModal = ({ onClose }) => {
//   const navigate = useNavigate();
//   const [surahs, setSurahs] = useState([
//     {
//       id: 1,
//       arabic: 'الفاتحة',
//       malayalam: 'അൽ ഫാത്തിഹ',
//       english: 'Al-Fatihah (The Opening)'
//     },
//     {
//       id: 2,
//       arabic: 'البقرة',
//       malayalam: 'അൽ ബഖറ',
//       english: 'Al-Baqarah (The Cow)'
//     },
//     {
//       id: 3,
//       arabic: 'الإخلاص',
//       malayalam: 'അൽ ഇഖ്‌ലാസ്',
//       english: 'Al-Ikhlas (The Sincerity)'
//     },
//     {
//       id: 4,
//       arabic: 'الفلق',
//       malayalam: 'അൽ ഫലഖ്',
//       english: 'Al-Falaq (The Daybreak)'
//     },
//     {
//       id: 5,
//       arabic: 'الناس',
//       malayalam: 'അൻ നാസ്',
//       english: 'An-Nas (Mankind)'
//     }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   const handleDelete = (id) => {
//     setSurahs(surahs.filter(surah => surah.id !== id));
//   };

//   const filteredSurahs = surahs.filter(surah =>
//     surah.arabic.includes(searchQuery) ||
//     surah.malayalam.includes(searchQuery) ||
//     surah.english.toLowerCase().includes(searchQuery.toLowerCase())
//   );



//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black bg-opacity-50">
//       <div className="bg-white w-full h-full sm:h-auto sm:rounded-lg shadow-xl sm:max-w-2xl sm:max-h-[90vh] flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="bg-teal-600 p-4 flex items-center justify-between flex-shrink-0">
//           <h1 className="text-white text-xl font-medium">Surah Management</h1>
//           <button
//             onClick={() => onClose ? onClose() : navigate('/')}
//             className="text-white hover:bg-teal-700 p-2 rounded transition"
//           >
//             <ExternalLink size={24} />
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-teal-600 px-4 pb-4 flex-shrink-0">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by Surah name (Arabic / Malayalam / English) or"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-3 pr-12 rounded-lg border-none focus:outline-none text-gray-400 text-sm"
//             />
//             <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
//           </div>
//         </div>

//         {/* Surah List - Scrollable */}
//         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
//           {filteredSurahs.length === 0 ? (
//             <div className="text-center py-8 text-gray-400">
//               No surahs found matching your search.
//             </div>
//           ) : (
//             filteredSurahs.map((surah) => (
//               <div
//                 key={surah.id}
//                 className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 
//                         className="text-2xl font-light text-gray-300" 
//                         style={{ direction: 'rtl' }}
//                       >
//                         {surah.arabic}
//                       </h3>
//                       <button className="text-blue-400 hover:bg-blue-50 p-2 rounded transition">
//                         <Edit2 size={20} />
//                       </button>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-teal-600 text-xl font-normal">
//                         {surah.malayalam}
//                       </span>
//                       <button 
//                         onClick={() => handleDelete(surah.id)}
//                         className="text-red-400 hover:bg-red-50 p-2 rounded transition"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </div>
                    
//                     <p className="text-gray-400 text-sm mt-2">{surah.english}</p>
//                   </div>
//           <button className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110">
//           <Plus size={28} />
//         </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

       
      
//       </div>
//     </div>
//   );
// };

// export default SurahManagementModal;


import React, { useState } from 'react';
import { Search, Edit2, Trash2, ExternalLink, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddSurahModal from './AddSurahModal';
import SurahAyatModal from './SurahAyatModal';
import EditSurahModal from './EditSurahModal';

const SurahManagementModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [surahs, setSurahs] = useState([
    {
      id: 1,
      arabic: 'الفاتحة',
      malayalam: 'അൽ ഫാത്തിഹ',
      english: 'Al-Fatihah (The Opening)',
      ayats: [
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        'الرَّحْمَٰنِ الرَّحِيمِ',
        'مَالِكِ يَوْمِ الدِّينِ',
        'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
      ]
    },
    {
      id: 2,
      arabic: 'البقرة',
      malayalam: 'അൽ ബഖറ',
      english: 'Al-Baqarah (The Cow)',
      ayats: ['Example verse 1', 'Example verse 2']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [editingSurah, setEditingSurah] = useState(null);

  const handleDeleteSurah = (id) => setSurahs(surahs.filter(s => s.id !== id));
  const handleAddSurah = (newSurah) => setSurahs([...surahs, { ...newSurah, id: surahs.length + 1 }]);
  const handleEditSurah = (updatedSurah) => {
    setSurahs(surahs.map(s => s.id === updatedSurah.id ? updatedSurah : s));
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.arabic.includes(searchQuery) ||
    surah.malayalam.includes(searchQuery) ||
    surah.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black bg-opacity-50">
      <div className="bg-white w-full h-full sm:h-auto sm:rounded-lg shadow-xl sm:max-w-2xl sm:max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-teal-600 p-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-white text-xl font-medium">Surah Management</h1>
          <button
            onClick={() => onClose ? onClose() : navigate('/')}
            className="text-white hover:bg-teal-700 p-2 rounded transition"
          >
            <ExternalLink size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="bg-teal-600 px-4 pb-4 flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Surah name (Arabic / Malayalam / English)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg border-none focus:outline-none text-gray-400 text-sm"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Surah List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 relative">
          {filteredSurahs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No surahs found matching your search.
            </div>
          ) : (
            filteredSurahs.map((surah) => (
              <div
                key={surah.id}
                onClick={() => setSelectedSurah(surah)}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-light text-gray-300" style={{ direction: 'rtl' }}>
                        {surah.arabic}
                      </h3>
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingSurah(surah); }}
                        className="text-blue-400 hover:bg-blue-50 p-2 rounded transition"
                      >
                        <Edit2 size={20} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-teal-600 text-xl font-normal">{surah.malayalam}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteSurah(surah.id); }}
                        className="text-red-400 hover:bg-red-50 p-2 rounded transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{surah.english}</p>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Plus button inside container */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowAddModal(true); }}
            className="absolute bottom-4 right-4 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
          >
            <Plus size={28} />
          </button>
        </div>
      </div>

      {/* Add Surah Modal */}
      {showAddModal && <AddSurahModal onClose={() => setShowAddModal(false)} onSave={handleAddSurah} />}

      {/* Edit Surah Modal */}
      {editingSurah && <EditSurahModal surah={editingSurah} onClose={() => setEditingSurah(null)} onSave={handleEditSurah} />}

      {/* Surah Ayat Modal */}
      {selectedSurah && <SurahAyatModal surah={selectedSurah} onClose={() => setSelectedSurah(null)} />}
    </div>
  );
};

export default SurahManagementModal;
