


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Edit2,
  X,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  getAyatById,
  updateAyatMeaning,
  getFractionsByAyat,
  updateFraction,
  addFraction,
  deleteFraction,
  deleteAyat,
} from "../data/ayatsData";

function AyatDetailPage() {
  const { ayatId } = useParams();
  const navigate = useNavigate();

  const [ayat, setAyat] = useState(null);
  const [fractions, setFractions] = useState([]);
  const [meaning, setMeaning] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");
  const [tempAyatText, setTempAyatText] = useState("");
  const [tempMeaning, setTempMeaning] = useState("");
  const [tempWordMeaning, setTempWordMeaning] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showWordMeaning, setShowWordMeaning] = useState(false);

  // Fetch ayat + fractions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAyatById(ayatId);
        setAyat(data);
        setMeaning(data.meaning_text || "");
        setWordMeaning(data.word_meaning || "");
        setTempAyatText(data.ayat_text || "");

        const fractionData = await getFractionsByAyat(ayatId);
        setFractions(fractionData);
      } catch (error) {
        console.error("Failed to fetch ayat:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ayatId]);

  // Save Ayat (Arabic + meaning + word meaning)
  const handleSave = async () => {
    if (!tempAyatText.trim() && !tempMeaning.trim() && !tempWordMeaning.trim()) {
      alert("Please enter text before saving!");
      return;
    }

    setSaving(true);
    try {
      await updateAyatMeaning(ayatId, {
        ayat_text: tempAyatText,
        meaning_text: tempMeaning,
        word_meaning: tempWordMeaning,
      });

      setAyat((prev) => ({ ...prev, ayat_text: tempAyatText }));
      setMeaning(tempMeaning);
      setWordMeaning(tempWordMeaning);
      setIsEditing(false);
      alert("✅ Ayat updated successfully!");
    } catch (error) {
      alert("❌ Failed to update Ayat!");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setTempAyatText(ayat.ayat_text || "");
    setTempMeaning(meaning);
    setTempWordMeaning(wordMeaning);
    setIsEditing(true);
  };

  const handleCancel = () => setIsEditing(false);

  const handleDeleteAyat = async () => {
    if (!window.confirm("Are you sure you want to delete this Ayat?")) return;
    try {
      await deleteAyat(ayatId);
      alert("🗑️ Ayat deleted successfully!");
      navigate(-1);
    } catch (error) {
      alert("❌ Failed to delete Ayat!");
      console.error(error);
    }
  };

  const toggleWordMeaning = () => setShowWordMeaning((prev) => !prev);

  // Save updated fraction
  const handleFractionSave = async (id, text, meaning, tafseer) => {
    try {
      await updateFraction(id, {
        ayat_fraction_text: text,
        ayat_fraction_meaning: meaning,
        ayat_fraction_tafseer: tafseer,
      });
      setFractions((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                ayat_fraction_text: text,
                ayat_fraction_meaning: meaning,
                ayat_fraction_tafseer: tafseer,
              }
            : f
        )
      );
      alert("✅ Fraction updated!");
    } catch (error) {
      alert("❌ Failed to update fraction!");
      console.error(error);
    }
  };

  // Add new fraction manually
  const handleAddFraction = async () => {
    const newFraction = {
      ayat: ayatId,
      ayat_fraction_number: fractions.length + 1,
      ayat_fraction_text: "",
      ayat_fraction_meaning: "",
    };
    try {
      const created = await addFraction(newFraction);
      setFractions((prev) => [...prev, created]);
    } catch (error) {
      alert("❌ Failed to add fraction!");
      console.error(error);
    }
  };

  // Delete fraction
  const handleDeleteFraction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fraction?")) return;
    try {
      await deleteFraction(id);
      setFractions((prev) => prev.filter((f) => f.id !== id));
      alert("🗑️ Fraction deleted!");
    } catch (error) {
      alert("❌ Failed to delete fraction!");
      console.error(error);
    }
  };

  // ✅ Split by selecting Arabic text
  const handleTextSelection = async () => {
    const selection = window.getSelection().toString().trim();
    if (!selection) return;

    if (!/[\u0600-\u06FF]/.test(selection)) {
      alert("❌ Please select Arabic text only!");
      return;
    }

    if (!window.confirm(`Add this as a new fraction?\n\n"${selection}"`)) return;

    const newFraction = {
      ayat: ayatId,
      ayat_fraction_number: fractions.length + 1,
      ayat_fraction_text: selection,
      ayat_fraction_meaning: "",
    };

    try {
      const created = await addFraction(newFraction);
      setFractions((prev) => [...prev, created]);
      alert("✅ Fraction created from selected text!");
    } catch (error) {
      console.error("❌ Failed to create fraction:", error);
      alert("Failed to create fraction!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading Ayat...
      </div>
    );

  if (!ayat)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Ayat not found.
      </div>
    );

  const toArabicNumber = (num) => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num.toString().replace(/[0-9]/g, (d) => arabicDigits[d]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pb-16">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-amber-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-amber-100 rounded-full transition">
            <ArrowLeft className="text-amber-800 w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-amber-900">
            Ayat {toArabicNumber(ayat.ayat_number)}
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Main Ayat Box */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="border border-amber-900 rounded-2xl bg-white shadow-md p-6 space-y-4">
          {/* Full Ayat Arabic */}
          {isEditing ? (
            <textarea
              dir="rtl"
              value={tempAyatText}
              onChange={(e) => setTempAyatText(e.target.value)}
              rows="3"
              className="w-full text-3xl text-amber-900 text-right border rounded-xl p-3"
              style={{ fontFamily: "Amiri, serif" }}
            />
          ) : (
            <p
              dir="rtl"
              className="text-3xl text-amber-900 text-right select-text cursor-pointer"
              onMouseUp={handleTextSelection}
              onTouchEnd={handleTextSelection}
              style={{ fontFamily: "Amiri, serif", lineHeight: "2.5rem" }}
            >
              {ayat.ayat_text}
            </p>
          )}

          <hr className="border-t border-amber-200" />

          {/* Malayalam Meaning */}
          {isEditing ? (
            <textarea
              value={tempMeaning}
              onChange={(e) => setTempMeaning(e.target.value)}
              rows="4"
              placeholder="Enter Malayalam meaning..."
              className="w-full border border-amber-100 rounded-xl p-3"
            />
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {meaning || "— No meaning added yet —"}
            </p>
          )}

          {/* Word Meaning */}
          <div className="mt-3">
            <button
              onClick={toggleWordMeaning}
              className="flex items-center gap-1 text-amber-700 font-medium hover:text-amber-900 transition"
            >
              {showWordMeaning ? (
                <>
                  <ChevronUp size={18} /> Hide Word Meaning
                </>
              ) : (
                <>
                  <ChevronDown size={18} /> Show Word Meaning
                </>
              )}
            </button>

            {showWordMeaning && (
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-2">
                {wordMeaning || "— No word meaning added yet —"}
              </p>
            )}
          </div>
        </div>

        {/* Fraction Section */}
        <div className="mt-10 space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddFraction}
              className="flex items-center gap-1 text-amber-800 hover:text-amber-900 transition"
            >
              <Plus size={22} /> Add sentence
            </button>
          </div>

          {fractions.length > 0 ? (
            fractions.map((f) => (
              <FractionBox
                key={f.id}
                fraction={f}
                onSave={handleFractionSave}
                onDelete={handleDeleteFraction}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No fractions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ FractionBox Component (inline)
const FractionBox = ({ fraction, onSave, onDelete }) => {
  const [text, setText] = useState(fraction.ayat_fraction_text || "");
  const [meaning, setMeaning] = useState(fraction.ayat_fraction_meaning || "");
  const [tafseer, setTafseer] = useState(fraction.ayat_fraction_tafseer || "");
  const [edit, setEdit] = useState(false);
  const [showMeaning, setShowMeaning] = useState(true);
  const [showTafseer, setShowTafseer] = useState(false);

  return (
    <div className="border border-amber-200 rounded-xl p-4 bg-amber-50 shadow-sm mb-4">
      {edit ? (
        <>
          <textarea
            dir="rtl"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="2"
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="Arabic Text"
          />
          <textarea
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            rows="2"
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="Meaning"
          />
          <textarea
            value={tafseer}
            onChange={(e) => setTafseer(e.target.value)}
            rows="2"
            className="w-full border rounded-lg p-2 mb-3"
            placeholder="Tafseer"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                onSave(fraction.id, text, meaning, tafseer);
                setEdit(false);
              }}
              className="text-green-700 hover:text-green-800 px-80"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() => setEdit(false)}
              className="text-red-600 hover:text-red-700 "
            >
              <X size={20} />
            </button>
          </div>
        </>
      ) : (
        <>
          <p dir="rtl" className="text-xl text-amber-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
            {fraction.ayat_fraction_text}
          </p>

          {showMeaning && (
            <p className="text-gray-800  text-sm mb-2 text-start">
              <hr/>
              <strong>അർത്ഥം:</strong> {fraction.ayat_fraction_meaning}
            </p>
          )}

          {showTafseer && (
            <p className="text-sm text-start italic  p-3 rounded-lg">
              <hr className="w-full"/>
              <strong>തഫ്സീർ:</strong> {fraction.ayat_fraction_tafseer}
            </p>
          )}

          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-3">
              <button
                onClick={() => setShowMeaning(!showMeaning)}
                className="text-amber-700 hover:text-amber-900 text-sm flex items-center gap-1"
              >
                {showMeaning ? (
                  <>
                    <EyeOff size={16} /> Hide Meaning
                  </>
                ) : (
                  <>
                    <Eye size={16} /> Show Meaning
                  </>
                )}
              </button>

              <button
                onClick={() => setShowTafseer(!showTafseer)}
                className="text-amber-700 hover:text-amber-900 text-sm flex items-center gap-1"
              >
                {showTafseer ? (
                  <>
                    <EyeOff size={16} /> Hide Tafseer
                  </>
                ) : (
                  <>
                    <Eye size={16} /> Show Tafseer
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-end gap-10">
  <button
    onClick={() => setEdit(true)}
    className="text-gray-700 hover:text-amber-700 transition"
    title="Edit Fraction"
  >
    <Edit2 size={22} />
  </button>

  <button
    onClick={() => onDelete(fraction.id)}
    className="text-red-600 hover:text-red-700 transition"
    title="Delete Fraction"
  >
    <Trash2 size={22} />
  </button>
</div>


            {/* <div className="flex gap-3">
              <button onClick={() => setEdit(true)} className="text-gray-700 hover:text-amber-700 ">
                <Edit2 size={20} />
              </button>
              

              <button onClick={() => onDelete(fraction.id)} className="text-red-600 hover:text-red-700 ">
                <Trash2 size={20} />
              </button>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default AyatDetailPage;
