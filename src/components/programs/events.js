// import { api } from "../apiUtils/instance";

import { api } from "../../apiUtils/instance";

/**
 * Fetch all events and categorize them as ongoing, upcoming, or past.
 * This function calculates statuses based on date, not just relying on backend.
 */

// src/api/sessionApi.js
import axios from "axios";

// Replace this with your actual base URL or use .env variable
// const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const getSessionCategories = async () => {
    try {
        const response = await api.get(`/session-category`);
        return response.data;
    } catch (error) {
        console.error("API error while fetching session categories:", error);
        throw error;
    }
};


export const fetchCategorizedEvents = async () => {
  try {
    const res = await api.get(`/event`);
    const allEvents = res.data.data;

    const categorized = {
      ongoing: [],
      upcoming: [],
      past: [],
    };

    const now = new Date();

    allEvents.forEach((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      const item = {
        id: event._id,
        title: event.title,
        description: event.description,
        date: `${start.toDateString()} – ${end.toDateString()}`,
      };

      if (now >= start && now <= end) {
        categorized.ongoing.push(item);
      } else if (start > now) {
        categorized.upcoming.push(item);
      } else {
        categorized.past.push(item);
      }
    });

    return categorized;
  } catch (error) {
    console.error("Failed to fetch categorized events:", error);
    throw error;
  }
};


export const fetchWebinars = async () => {
  const response = await api.get(`/webinars`);
  return response.data; // Structure: { statusCode, success, message, data: [...] }
};


export const fetchWebinarById = async (id) => {
  const response = await api.get(`/webinars/${id}`);
  return response.data; // { success, message, data: { ... } }
};

// Fetch all workshops
// export const fetchWorkshops = async () => {
//   try {
//     const res = await api.get("/workshops");
//     return {
//       success: res.data?.success,
//       data: res.data?.data || [],
//     };
//   } catch (error) {
//     console.error("Error fetching workshops:", error);
//     return { success: false, data: [] };
//   }
// };

export const fetchWorkshops = async () => {
  try {
    const res = await api.get("/workshops");
    return {
      success: res.data?.success,
      data: res.data?.data || [],
    };
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return { success: false, data: [] };
  }
};

// fetch single workshop by ID
export const fetchWorkshopById = async (id) => {
  try {
    const res = await api.get(`/workshops/${id}`);
    return {
      success: res.data?.success,
      data: res.data?.data || null,
    };
  } catch (error) {
    console.error("Error fetching workshop by id:", error);
    return { success: false, data: null };
  }
};


// export const fetchInternshipSessions = async () => {
//   try {
//     const res = await api.get(`/internship-sessions`);
//     return res.data; // { success: true, data: [...] }
//   } catch (error) {
//     console.error("Failed to fetch internship sessions:", error);
//     return { success: false, data: [] };
//   }
// };

// Fetch all internship sessions
export const fetchInternshipSessions = async () => {
  try {
    const res = await api.get("/internship-sessions");
    return res.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Failed to fetch internship sessions:", error);
    return { success: false, data: [] };
  }
};

// ✅ Fetch a single internship session by ID
export const fetchInternshipSessionById = async (id) => {
  try {
    const res = await api.get(`/internship-sessions/${id}`);
    return res.data; // { success: true, data: {...} }
  } catch (error) {
    console.error(`Error fetching internship session with ID ${id}:`, error);
    return { success: false, data: null };
  }
};
