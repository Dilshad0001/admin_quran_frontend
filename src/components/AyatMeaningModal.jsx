

// export default AyatMeaningModal;
import React, { useState } from "react";
import { X } from "lucide-react";
import { updateAyatMeaning } from "../data/ayatsData";

const AyatMeaningModal = ({ ayat, onClose, onSave }) => {
  const [meaning, setMeaning] = useState(ayat.meaning_text || "");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async () => {
    if (!meaning.trim()) {
      setErrorMsg("⚠️ Please enter a meaning before saving.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // ✅ Real API call
      const updatedAyat = await updateAyatMeaning(ayat.id, meaning);
      setSuccessMsg("✅ Meaning saved successfully!");
      onSave(updatedAyat, meaning);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (error) {
      setErrorMsg("❌ Failed to save meaning. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3">
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {/* <h2 className="text-lg font-semibold text-amber-800">
            Add Meaning for Ayat {ayat.ayat_number}
          </h2> */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X />
          </button>
        </div>

        {/* Arabic Text */}
        <div
          dir="rtl"
          className="text-2xl text-right text-gray-800 bg-amber-50 rounded-lg p-4 mb-4 border border-amber-100"
          style={{ fontFamily: "Amiri, serif" }}
        >
          {ayat.ayat_text}
        </div>

        {/* Meaning Input */}
        <textarea
          rows={5}
          placeholder="Enter the complete meaning..."
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 outline-none text-gray-700"
        />

        {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white transition ${
              loading ? "bg-amber-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? "Saving..." : "Save Meaninggldjsgksdjglds"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AyatMeaningModal;
