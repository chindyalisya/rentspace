// @ts-nocheck
const K = 'rs_cart';
export const getCart = () => {
    try {
        return JSON.parse(localStorage.getItem(K) || '[]');
    } catch {
        return [];
    }
};
export const setCart = (c) => localStorage.setItem(K, JSON.stringify(c));
export const daysBetween = (a, b) =>
    Math.max(1, Math.round((+new Date(b) - +new Date(a)) / 864e5) + 1);
export const today = (add = 0) =>
    new Date(Date.now() + add * 864e5).toISOString().slice(0, 10);
