import { logout, setCredentials } from "./authSlice";

let logoutTimer;

export const startAutoLogout = () => (dispatch) => {
    // Clear any existing timer
    if (logoutTimer) clearTimeout(logoutTimer);

    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - parseInt(loginTime, 10);
        // const remainingTime = 4 * 60 * 60 * 1000 - elapsedTime; // Change to 4 hours
        const remainingTime = 15000 - elapsedTime; // Change to 5 seconds

        if (remainingTime <= 0) {
            dispatch(logout()); // Logout immediately if time is up
        } else {
            logoutTimer = setTimeout(() => {
                dispatch(logout());
            }, remainingTime);
        }
    }
};

// Call this function on login to start the timer
export const handleUserLogin = (userData) => (dispatch) => {
    dispatch(setCredentials(userData));
    dispatch(startAutoLogout()); // Start timer on login
};
