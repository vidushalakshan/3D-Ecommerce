// src/lib/clerk.js
export const isSuperAdmin = (email) => {
  const SUPER_ADMIN_EMAIL = "vidushalakshan7890@gmail.com"; // ← YOUR EMAIL
  return email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
};