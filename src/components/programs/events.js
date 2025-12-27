import { api } from "../../apiUtils/instance";

/* =====================================================
   🔹 SESSION CATEGORIES
===================================================== */

//  Fetch all session categories.
export const getSessionCategories = async () => {
  try {
    const response = await api.get(`/session-category`);
    return response.data;
  } catch (error) {
    console.error("API error while fetching session categories:", error);
    throw error;
  }
};

/* =====================================================
   🔹 EVENTS (Categorized by Date)
===================================================== */

/**
 * Fetch all events and categorize them as ongoing, upcoming, or past.
 * Categorization is done on the frontend using event start/end dates.
 */

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



//  Fetches details for a specific event by ID.
export const getEventById = async (eventId) => {
  const response = await api.get(`/event/${eventId}`);
  return response.data.data;
};

/* =====================================================
   🔹 WEBINARS
===================================================== */

//  Fetch all webinars.
export const fetchWebinars = async () => {
  const response = await api.get(`/webinars`);
  return response.data;
};

// Fetch a single webinar by ID.

export const fetchWebinarById = async (id) => {
  const response = await api.get(`/webinars/${id}`);
  return response.data;
};

/* =====================================================
   🔹 WORKSHOPS
===================================================== */

//  Fetch all workshops.
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

//  Fetch a single workshop by ID.
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

/* =====================================================
   🔹 INTERNSHIP SESSIONS
===================================================== */

//  Fetch all internship sessions.
export const fetchInternshipSessions = async () => {
  try {
    const res = await api.get("/internship-sessions");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch internship sessions:", error);
    return { success: false, data: [] };
  }
};

//  Fetch a single internship session by ID.
export const fetchInternshipSessionById = async (id) => {
  try {
    const res = await api.get(`/internship-sessions/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching internship session with ID ${id}:`, error);
    return { success: false, data: null };
  }
};
