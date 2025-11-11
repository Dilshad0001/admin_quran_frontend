

function AddSurahModal({ onClose, onSave, initialData }) {
  const [arabic, setArabic] = useState(initialData?.surah_name_arabic || "");
  const [malayalam, setMalayalam] = useState(initialData?.surah_name_malayalam || "");
  const [english, setEnglish] = useState(initialData?.surah_name_english || "");
  const [number, setNumber] = useState(initialData?.surah_number || "");

  const handleSubmit = () => {
    const data = {
      surah_name_arabic: arabic,
      surah_name_malayalam: malayalam,
      surah_name_english: english,
      surah_number: number,
    };
    onSave(data);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {initialData ? "Edit Surah" : "Add Surah"}
      </h2>

      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Surah Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Arabic Name"
        value={arabic}
        onChange={(e) => setArabic(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Malayalam Name"
        value={malayalam}
        onChange={(e) => setMalayalam(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="English Name"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          {initialData ? "Update" : "Save"}
        </button>
        <button onClick={onClose} className="px-4 py-2 text-gray-600">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddSurahModal;
