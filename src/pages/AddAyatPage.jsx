
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { addAyat } from "../data/ayatsData";

function AddAyatPage({ surahId, lastAyatNumber = 0, onClose, onSave }) {
  const [ayatNumber, setAyatNumber] = useState("");
  const [ayatText, setAyatText] = useState("");
  const [meaningText, setMeaningText] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Auto-fill next number on mount
  useEffect(() => {
    setAyatNumber(lastAyatNumber + 1);
  }, [lastAyatNumber]);

  const handleSubmit = async () => {
    if (!ayatNumber || !ayatText) {
      setErrorMsg("⚠️ Ayat number and Arabic text are required.");
      return;
    }

    const data = {
      surah: Number(surahId),
      ayat_number: Number(ayatNumber),
      ayat_text: ayatText,
      meaning_text: meaningText || "",
      word_meaning: wordMeaning || "",
    };

    try {
      setLoading(true);
      setErrorMsg("");
      const newAyat = await addAyat(data);
      onSave?.(newAyat);
      alert("✅ Ayat added successfully!");
      onClose?.();
    } catch (err) {
      console.error("❌ Failed to add Ayat:", err);
      setErrorMsg("Failed to add Ayat. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700">
            Add New Ayat
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X />
          </button>
        </div>

        {/* Surah Info */}
        <p className="text-sm text-gray-500 mb-2">
          <strong>Surah ID:</strong> {surahId}
        </p>

        {/* Inputs */}
        <input
          type="number"
          placeholder="Ayat Number *"
          value={ayatNumber}
          onChange={(e) => setAyatNumber(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Enter Ayat (Arabic) *"
          value={ayatText}
          onChange={(e) => setAyatText(e.target.value)}
          className="w-full border p-2 rounded mb-3 h-20"
        />

        <textarea
          placeholder="Ayat Meaning (Malayalam) — optional"
          value={meaningText}
          onChange={(e) => setMeaningText(e.target.value)}
          className="w-full border p-2 rounded mb-3 h-20"
        />

        <textarea
          placeholder="Word Meaning — optional"
          value={wordMeaning}
          onChange={(e) => setWordMeaning(e.target.value)}
          className="w-full border p-2 rounded mb-4 h-20"
        />

        {errorMsg && <p className="text-red-600 text-sm mb-3">{errorMsg}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition ${
            loading && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loading ? "Adding..." : "Add Ayat"}
        </button>
      </div>
    </div>
  );
}

export default AddAyatPage;
