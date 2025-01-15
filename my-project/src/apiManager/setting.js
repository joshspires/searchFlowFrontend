import api from './api';

export const getSearchPreference = async (userId, siteId) => {
    const res = await api.get(`/searchPreferenceManagementRoutes/getSearchPreference/${userId}`, {
        params: { siteId },
    });
    return res.data;
};
export const postSearchPreference = async (data) => {
    try {
        const res = await api.post(
            `/searchPreferenceManagementRoutes/createorUpdateSearchPreference`,
            data // Data sent in the body
        );
        return res.data;
    } catch (error) {
        console.error('Error posting search preferences:', error);
        throw error;
    }
};
export const getDataOfSiteAndUser = async (userId, siteId) => {
    const res = await api.get(`/webFlowManagementRoutes/getDataofSiteandUser`, {
        params: { userId, siteId },
    });
    return res.data;
};

