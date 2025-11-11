


import React, { useState, useEffect, useRef } from "react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSurahs, deleteSurah, updateSurah } from "../data/ayatsData";
import AddSurahModal from "../Admin/AddSurahModal";

function SurahListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingSurah, setEditingSurah] = useState(null);
  const [longPressedSurah, setLongPressedSurah] = useState(null);
  const longPressTimer = useRef(null);

  // 🟢 Fetch Surahs
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSurahs();
      setSurahs(data);
      setFilteredSurahs(data);
    };
    fetchData();
  }, []);

  // 🟢 Filter by search
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredSurahs(
      surahs.filter(
        (s) =>
          s.surah_name_arabic?.includes(searchQuery) ||
          s.surah_name_malayalam?.includes(searchQuery) ||
          s.surah_name_english?.toLowerCase().includes(q) ||
          s.surah_number?.toString().includes(q)
      )
    );
  }, [searchQuery, surahs]);

  // 🟢 Long Press handlers (works on mobile + desktop)
  const handleLongPressStart = (e, surah) => {
    // e.preventDefault();
    longPressTimer.current = setTimeout(() => setLongPressedSurah(surah), 600);
  };
  const handleLongPressEnd = () => clearTimeout(longPressTimer.current);

  // 🟢 Right-click (for laptop)
  const handleRightClick = (e, surah) => {
    e.preventDefault();
    setLongPressedSurah(surah);
  };

  // 🟢 Delete Surah
  const handleDeleteSurah = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Surah?")) return;
    try {
      await deleteSurah(id);
      setSurahs((prev) => prev.filter((s) => s.id !== id));
      setLongPressedSurah(null);
      alert("🗑️ Surah deleted successfully!");
    } catch {
      alert("❌ Failed to delete Surah!");
    }
  };

  // 🟢 Edit Surah (open modal)
  const openEditModal = (surah) => {
    setEditingSurah(surah);
    setShowEdit(true);
    setLongPressedSurah(null);
  };

  // 🟢 Update Surah (save changes)
  const handleUpdateSurah = async (updated) => {
    try {
      await updateSurah(editingSurah.id, updated);
      setSurahs((prev) =>
        prev.map((s) =>
          s.id === editingSurah.id ? { ...s, ...updated } : s
        )
      );
      alert("✅ Surah updated successfully!");
      setShowEdit(false);
      setEditingSurah(null);
    } catch {
      alert("❌ Failed to update Surah!");
    }
  };

  // 🟢 Add Surah
  const handleAddSurah = (newSurah) => {
    setSurahs((prev) => [...prev, newSurah]);
    setShowAdd(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      <div
        className={`max-w-2xl mx-auto px-4 py-4 transition-all duration-500 ${
          showAdd || showEdit ? "blur-md scale-[0.98]" : ""
        }`}
      >
        {/* 🔍 Search */}
        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600"
            size={22}
          />
          <input
            type="text"
            placeholder="സൂറത്ത് തിരയുക..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-12 pr-4 rounded-2xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none bg-white/90 shadow-lg placeholder:text-teal-400"
          />
        </div>

        {/* 📜 Surah List */}
        <div className="space-y-1 ">
          {filteredSurahs.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(`/surah/${s.id}`)}
              onContextMenu={(e) => handleRightClick(e, s)} // right-click desktop
              onTouchStart={(e) => handleLongPressStart(e, s)} // mobile hold
              onTouchEnd={handleLongPressEnd}
              onMouseDown={(e) => handleLongPressStart(e, s)}
              onMouseUp={handleLongPressEnd}
              className="relative  h-16 rounded-3xl p-6 shadow-md hover:shadow-xl border border-teal-100 hover:border-teal-300 bg-white/60 backdrop-blur cursor-pointer transition"
            >
              {/* Normal card */}
              <div className="flex justify-between items-center  -mt-3 ">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-2xl flex items-center justify-center font-semibold shadow">
                    {s.surah_number}
                  </div>
                  <p className="text-gray-900 text-sm">{s.surah_name_malayalam}</p>
                </div>
                <h2
                  className="text-2xl text-gray-700"
                  style={{ fontFamily: "Amiri, serif" }}
                >
                  {s.surah_name_arabic}
                </h2>
              </div>

              {/* 🟢 Overlay: Edit/Delete */}
              {longPressedSurah?.id === s.id && (
                <div className="absolute inset-0 flex justify-center items-center gap-6 bg-white/95 rounded-3xl z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(s);
                    }}
                    className="text-teal-700 hover:text-teal-900"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSurah(s.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ➕ Add Button */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 z-50"
      >
        <Plus size={28} />
      </button>

      {/* ➕ Add Modal */}
      {showAdd && (
        <div className="absolute inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">

            <AddSurahModal
  onClose={() => setShowAdd(false)}
  onSave={handleAddSurah}
  lastSurahNumber={
    surahs.length > 0 ? surahs[surahs.length - 1].surah_number : 0
  }
/>



          </div>
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {showEdit && (
        <div className="absolute inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">

<AddSurahModal
  onClose={() => setShowAdd(false)}
  onSave={handleAddSurah}
  lastSurahNumber={
    surahs.length > 0 ? surahs[surahs.length - 1].surah_number : 0
  }
/>


          </div>
        </div>
      )}
    </div>
  );
}

export default SurahListPage;
