import Cookies from "js-cookie";

const COOKIE_EXPIRY_DAYS = 7; // Default expiry duration

// ✅ Set individual cookies
export const setCookie = (key, value, days = COOKIE_EXPIRY_DAYS) => {
  Cookies.set(key, value, { expires: days, domain: 'codedrift.co', path: "/" });
    // Cookies.set(key, value, { expires: days });
};

// ✅ Get a cookie by key
export const getCookie = (key) => {
  return Cookies.get(key);
};

// ✅ Remove a cookie
export const removeCookie = (key) => {
  Cookies.remove(key);
};

// ✅ Store multiple values as JSON in one cookie
export const setCookieObject = (key, object, days = COOKIE_EXPIRY_DAYS) => {
  Cookies.set(key, JSON.stringify(object), { expires: days });
};

// ✅ Read object from cookie
export const getCookieObject = (key) => {
  const cookie = Cookies.get(key);
  try {
    return cookie ? JSON.parse(cookie) : null;
  } catch (e) {
    return null;
  }
};

// ✅ Remove all relevant cookies (for logout)
export const clearUserCookies = () => {
  removeCookie("studentId");
  removeCookie("mobileNo");
  removeCookie("studentData"); // if stored as object
  removeCookie("token"); // 🔐 Don't forget auth token cleanup
  removeCookie("role");
  removeCookie("courseId");
};
