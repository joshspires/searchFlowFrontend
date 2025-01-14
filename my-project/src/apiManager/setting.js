import api from './api';

export const getSearchPreference = async (userId, siteId) => {
    const res = await api.get(`/searchPreferenceManagementRoutes/getSearchPreference/${userId}`, {
        params: { siteId },
    });
    return res.data;
};
export const postSearchPreference = async (preferences) => {
    try {
        const res = await api.post(
            `/searchPreferenceManagementRoutes/createorUpdateSearchPreference`,
            preferences // Data sent in the body
        );
        console.log("response", res);

        return res.data;
    } catch (error) {
        console.error('Error posting search preferences:', error);
        throw error;
    }
};
