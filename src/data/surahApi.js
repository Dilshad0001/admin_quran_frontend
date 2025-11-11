import axios from "axios";

const BASE_URL = "https://qura-an-backend-tbdt.onrender.com"; // your backend URL

// ✅ Fetch all Surahs
export const getSurahs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/surah/`);
    // Map data into the same structure your component expects
    return response.data.map((s) => ({
      id: s.id,
      number:s.surah_number,
      arabic: s.surah_name_arabic,
      malayalam: s.surah_name_malayalam,
      english: s.surah_name_english,
      totalAyats: s.totalAyats || 0, // fallback if not included in API
    }));
    
  } catch (error) {
    console.error("❌ Failed to fetch Surahs:", error);
    return [];
  }
};
