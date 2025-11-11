





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { getAyatsBySurah } from "../data/ayatsData";
import { getSurahs } from "../data/surahApi";
import AddAyatPage from "./AddAyatPage";

function SurahDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ayats, setAyats] = useState([]);
  const [surahName, setSurahName] = useState("");
  const [malayalamSurahName, setMalayalamSurahName] = useState("");
  const [showAddAyat, setShowAddAyat] = useState(false);

  // ✅ Fetch Surah + Ayats
  useEffect(() => {
    const fetchData = async () => {
      const ayatsData = await getAyatsBySurah(id);
      setAyats(ayatsData);

      const surahs = await getSurahs();
      const found = surahs.find((s) => s.id === Number(id));
      setSurahName(found?.arabic || "");
      setMalayalamSurahName(found?.malayalam || "");
    };
    fetchData();
  }, [id]);

  // ✅ Convert number → Arabic numerals
  const toArabicNumber = (num) => {
    const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num.toString().replace(/[0-9]/g, (d) => digits[d]);
  };

  // ✅ When new ayat added → refresh list
  const handleAyatAdded = (newAyat) => {
    setAyats((prev) => [...prev, newAyat]);
    setShowAddAyat(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      <div
        className={`transition-all duration-500 ${
          showAddAyat ? "blur-md scale-[0.98]" : ""
        }`}
      >
        {/* 🔹 Header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-amber-200 backdrop-blur-sm bg-opacity-95">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-amber-50 rounded-full transition"
            >
              <ArrowLeft className="text-amber-800 w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-amber-900">
              {malayalamSurahName}
            </h1>
            <div className="w-9"></div>
          </div>
        </div>

        {/* 🔹 Surah Arabic Title */}
        <div className="max-w-4xl mx-auto px-4 my-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-900"
            dir="rtl"
            style={{ fontFamily: "Amiri, serif" }}
          >
            سُورَةُ {surahName}
          </h2>
        </div>

        {/* 🔹 Bismillah (except Surah 9) */}
        {id !== "9" && (
          <div className="max-w-4xl mx-auto px-4 mb-8 text-center">
            <h3
              className="text-3xl md:text-4xl font-bold text-gray-800"
              style={{ fontFamily: "Amiri, serif" }}
              dir="rtl"
            >
              بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
            </h3>
          </div>
        )}

        {/* 🔹 Ayats List */}
        <div className="max-w-4xl mx-auto px-4 pb-24">
          <div className="bg-white space-y-4 rounded-lg shadow-md border border-amber-100 py-4 md:p-8">
            {ayats.map((ayat) => (
              <div
                key={ayat.id}
                onClick={() => navigate(`/ayat/${ayat.id}`)}
                className="rounded-lg shadow-sm border border-amber-100 p-6 bg-white cursor-pointer hover:bg-amber-50 transition"
              >
                <p
                  dir="rtl"
                  style={{
                    textAlign: "justify",
                    textAlignLast: "right",
                    fontFamily: "Amiri, serif",
                    fontSize: "1.875rem",
                    lineHeight: "2.5rem",
                  }}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-base font-bold mx-2">
                    {toArabicNumber(ayat.ayat_number)}
                  </span>
                  {ayat.ayat_text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Floating ➕ Button */}
        <button
          onClick={() => setShowAddAyat(true)}
          className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 z-50"
        >
          <Plus size={28} />
        </button>
      </div>


      {showAddAyat && (

  <AddAyatPage
  surahId={id}
  lastAyatNumber={ayats.length > 0 ? ayats[ayats.length - 1].ayat_number : 0}
  // onClose={() => setShowAdd(false)}   // ✅ FIX
  onClose={() => setShowAddAyat(false)}
  onSave={(newAyat) => setAyats([...ayats, newAyat])}
/>


)}

    </div>
  );
}

export default SurahDetailPage;
