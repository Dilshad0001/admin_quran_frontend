// import React, { useState } from "react";
// import { Edit2, Trash2, Save, X, Eye, EyeOff } from "lucide-react";

// const FractionBox = ({ fraction, onSave, onDelete }) => {
//   if (!fraction) return null;

//   const [text, setText] = useState(fraction.ayat_fraction_text || "");
//   const [meaning, setMeaning] = useState(fraction.ayat_fraction_meaning || "");
//   const [tafseer, setTafseer] = useState(fraction.ayat_fraction_tafseer || "");
//   const [edit, setEdit] = useState(false);
//   const [showTafseer, setShowTafseer] = useState(false);

//   return (
//     <div className="border border-amber-200 rounded-xl p-4 bg-amber-50 shadow-sm mb-4">
//       {edit ? (
//         <>
//           <textarea
//             dir="rtl"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows="2"
//             className="w-full border rounded-lg p-2 mb-2"
//             placeholder="Arabic Text (Ayat Fraction)"
//           />

//           <textarea
//             value={meaning}
//             onChange={(e) => setMeaning(e.target.value)}
//             rows="2"
//             className="w-full border rounded-lg p-2 mb-2"
//             placeholder="Meaning"
//           />

//           <textarea
//             value={tafseer}
//             onChange={(e) => setTafseer(e.target.value)}
//             rows="2"
//             className="w-full border rounded-lg p-2 mb-3"
//             placeholder="Tafseer"
//           />

//           <div className="flex justify-end gap-2">
//             <button
//               onClick={() => {
//                 onSave(fraction.id, text, meaning, tafseer);
//                 setEdit(false);
//               }}
//               className="text-green-700 hover:text-green-800"
//             >
//               <Save size={20} />
//             </button>
//             <button
//               onClick={() => setEdit(false)}
//               className="text-red-600 hover:text-red-700"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <p dir="rtl" className="text-xl text-amber-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
//             {fraction.ayat_fraction_text}
//           </p>
//           <hr className="border-t border-gray-300 mb-2" />
//           <p className="text-gray-800 mb-2">{fraction.ayat_fraction_meaning}</p>

//           <div className="flex justify-between items-center">
//             <button
//               onClick={() => setShowTafseer(!showTafseer)}
//               className="text-amber-700 hover:text-amber-900 text-sm flex items-center gap-1"
//             >
//               {showTafseer ? (
//                 <>
//                   <EyeOff size={16} /> Hide Tafseer
//                 </>
//               ) : (
//                 <>
//                   <Eye size={16} /> Show Tafseer
//                 </>
//               )}
//             </button>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setEdit(true)}
//                 className="text-gray-700 hover:text-amber-700"
//               >
//                 <Edit2 size={20} />
//               </button>
//               <button
//                 onClick={() => onDelete(fraction.id)}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           </div>

//           {showTafseer && (
//             <p className="mt-3 text-sm text-amber-700 italic bg-amber-100 p-3 rounded-lg">
//               <strong>തഫ്സീർ:</strong> {fraction.ayat_fraction_tafseer}
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default FractionBox;
import React, { useState } from "react";
import { Edit2, Trash2, Save, X, Eye, EyeOff } from "lucide-react";

const FractionBox = ({ fraction, onSave, onDelete }) => {
  if (!fraction) return null;

  const [text, setText] = useState(fraction.ayat_fraction_text || "");
  const [meaning, setMeaning] = useState(fraction.ayat_fraction_meaning || "");
  const [tafseer, setTafseer] = useState(fraction.ayat_fraction_tafseer || "");
  const [edit, setEdit] = useState(false);
  const [showMeaning, setShowMeaning] = useState(true); // default: show meaning
  const [showTafseer, setShowTafseer] = useState(false);

  return (
    <div className="border border-amber-200 rounded-xl p-4 bg-amber-50 shadow-sm mb-4">
      {edit ? (
        <>
          {/* Arabic Text */}
          <textarea
            dir="rtl"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="2"
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="Arabic Text (Ayat Fraction)"
          />

          {/* Meaning */}
          <textarea
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            rows="2"
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="Meaning"
          />

          {/* Tafseer */}
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
              className="text-green-700 hover:text-green-800"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() => setEdit(false)}
              className="text-red-600 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Arabic Text */}
          <p
            dir="rtl"
            className="text-xl text-amber-900 mb-2"
            style={{ fontFamily: "Amiri, serif" }}
          >
            {fraction.ayat_fraction_text}
          </p>

          <hr className="border-t border-gray-300 mb-2" />

          {/* Meaning (toggle) */}
          {showMeaning && (
            <p className="text-gray-800 mb-2">
              <strong>അർത്ഥം:</strong> {fraction.ayat_fraction_meaning}
            </p>
          )}

          {/* Tafseer (toggle) */}
          {showTafseer && (
            
            <p className="text-sm text-start  italic  py-3 rounded-lg mb-2">
                <hr/>
              <strong>തഫ്സീർ:</strong> {fraction.ayat_fraction_tafseer}
            </p>
          )}

          {/* Controls */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-wrap gap-3">
              {/* Toggle Meaning */}
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

              {/* Toggle Tafseer */}
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

            {/* Edit / Delete buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setEdit(true)}
                className="text-gray-700 hover:text-amber-700"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onDelete(fraction.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FractionBox;
