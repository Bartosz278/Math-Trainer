import { useEffect, useState } from "react";
import axios from "axios";

export const useStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/api/stats/userStats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStats(response.data);



        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return { stats, loading, error };
};
