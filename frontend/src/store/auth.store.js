import { create } from 'zustand';

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
        }
    }
    return "";
}

const authStore = create((set, get) => ({
    userData: (() => {
        const cookieValue = getCookie('userData');
        try {
            return cookieValue ? JSON.parse(cookieValue) : null;
        } catch (e) {
            console.error('Error parsing userData cookie:', e);
            return null;
        }
    })(),
    setUserData: (userData) => {
        console.log('cookie-dara', userData)
        set({ userData });
        setCookie('userData', JSON.stringify(userData), 7);
        console.log('User Data:', userData);
    },
    clearUserData: () => {
        console.log('Clearing user data');
        set({ userData: null });
        setCookie('userData', '', -1); // Set the cookie to expire immediately
    },
    updateUserDataToken: (newToken) => {
        set((state) => ({
            userData: {
                ...state.userData,
                tokens: newToken
            }
        }));
        setCookie('userData', JSON.stringify(get().userData), 7);
        console.log('User Data:', get().userData);
    },
}));

export default authStore;