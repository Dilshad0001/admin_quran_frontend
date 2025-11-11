

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { addSurah, updateSurah } from "../data/ayatsData";

const AddSurahModal = ({
  onClose,
  onSave,
  initialData = null,
  isEdit = false,
  lastSurahNumber = 0, // ✅ last number from parent
}) => {
  const [arabic, setArabic] = useState("");
  const [malayalam, setMalayalam] = useState("");
  const [english, setEnglish] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Pre-fill data (edit mode) or auto next number (add mode)
  useEffect(() => {
    if (isEdit && initialData) {
      setArabic(initialData.surah_name_arabic || "");
      setMalayalam(initialData.surah_name_malayalam || "");
      setEnglish(initialData.surah_name_english || "");
      setNumber(initialData.surah_number || "");
    } else {
      setNumber(lastSurahNumber + 1);
    }
  }, [initialData, isEdit, lastSurahNumber]);

  // ✅ Submit handler
  const handleSubmit = async () => {
    if (!arabic || !number) {
      setErrorMsg("⚠️ Arabic name and Surah number are required");
      return;
    }

    const surahData = {
      surah_number: Number(number),
      surah_name_arabic: arabic,
      surah_name_malayalam: malayalam || "", // ✅ optional
      surah_name_english: english || "",     // ✅ optional
    };

    try {
      setLoading(true);
      setErrorMsg("");

      if (isEdit && initialData) {
        const updatedSurah = await updateSurah(initialData.id, surahData);
        onSave(updatedSurah);
        alert("✅ Surah updated successfully!");
      } else {
        const newSurah = await addSurah(surahData);
        onSave(newSurah);
        alert("✅ Surah added successfully!");
      }

      onClose();
    } catch (error) {
      console.error(error);
      setErrorMsg("❌ Failed to save surah. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // ✅ close on outside click
      }}
    >
      <div className="bg-white p-5 rounded-lg w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700">
            {isEdit ? "Edit Surah" : "Add New Surah"}
          </h2>
          <button
            onClick={onClose} // ✅ close on X click
            className="text-gray-500 hover:text-red-500"
          >
            <X />
          </button>
        </div>

        {/* Form Fields */}
        <input
          type="number"
          placeholder="Surah Number *"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Surah name (arabic) *"
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Surah Name malayalam (optional)"
          value={malayalam}
          onChange={(e) => setMalayalam(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Surah Name English (optional)"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition ${
            loading && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Adding..."
            : isEdit
            ? "Update Surah"
            : "Add Surah"}
        </button>
      </div>
    </div>
  );
};

export default AddSurahModal;
