import api from './api';

export const verifycode = async (email, code) => {
    const res = await api.post('/userManagementRoutes/verifyEmailCode', { email, code });
    return res.data;
}

export const resendVerificationCode = async (email) => {
    const res = await api.post('/userManagementRoutes/resendVerificationCode', { email });
    return res.data;
}

export const forgotPassword = async (email) => {
    const res = await api.post('/userManagementRoutes/forgotPassword', { email });
    return res.data;
}

export const resetPassword = async (token, password) => {
    const res = await api.put(`/userManagementRoutes/resetPassword/${token}`, { password });
    return res.data;
};