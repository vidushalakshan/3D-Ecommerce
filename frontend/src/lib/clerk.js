// src/lib/clerk.js
export const isAdminEmail = (email) => {
  const ADMIN_EMAILS = ["vidushalakshan7890@gmail.com"]; // Add more if needed
  return email && ADMIN_EMAILS.some(e => e.toLowerCase() === email.toLowerCase());
};

export const isSuperAdmin = (email) => {
  const SUPER_ADMIN_EMAIL = "vidushalakshan7890@gmail.com";
  return email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
};