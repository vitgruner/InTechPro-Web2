/**
 * adminGuard.ts
 * Logic for checking if a user is in the admin whitelist.
 */

export const getAdminEmails = (): string[] => {
    const adminEmailsVar = import.meta.env.VITE_ADMIN_EMAILS || '';
    return adminEmailsVar.split(',').map((email: string) => email.trim().toLowerCase()).filter(Boolean);
};

export const isAdminWhitelisted = (email?: string | null): boolean => {
    if (!email) return false;
    const whitelist = getAdminEmails();
    return whitelist.includes(email.toLowerCase());
};

export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
