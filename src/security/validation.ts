/**
 * validation.ts
 * Security utilities for input validation and sanitization.
 */

export const sanitizeString = (str: string): string => {
    return str.replace(/[<>]/g, '').trim();
};

export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
    // Basic phone validation (allowing +, spaces, and numbers)
    const re = /^[\d\s+]{7,20}$/;
    return re.test(phone.trim());
};

export const limitString = (str: string, limit: number): string => {
    if (str.length <= limit) return str;
    return str.substring(0, limit);
};
