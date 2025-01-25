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
export const getAllUsers = async () => {
    const res = await api.get(`/userManagementRoutes/getAllUsers`);
    return res.data;
};
export const updateUser = async (userId, data) => {
    const res = await api.patch(`/userManagementRoutes/updateUser/${userId}`, data);
    return res.data;
};
export const connectNewWebFlowSite = async (userId) => {
    console.log("userId", userId);

    const res = await api.post(
        `http://localhost:3003/api/webFlowManagementRoutes/connectNewWebFlowSite`,
        {}, // Pass an empty object for the POST body
        {
            params: { userId }, // Add the query parameter here
        }
    );
    return res.data;
};

