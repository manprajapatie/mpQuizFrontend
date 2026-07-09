export const handleRequest = async (apiCall) => {
    try {
        const res = await apiCall();
        return res.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err.response?.data || err.message;
    }
};