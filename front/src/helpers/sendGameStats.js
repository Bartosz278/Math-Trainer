import axios from "axios";

const sendGameStats = async (stats) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://mathtrainer.onrender.com/api/stats/addGameStat",
      stats,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Game stats sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending game stats:", error);
    return null;
  }
};

export default sendGameStats;
