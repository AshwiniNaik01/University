import { Routes } from "react-router-dom";

export const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// console.log("env from config", API_BASE_URL);

// Images, notes and resume folder Routes
export const DIR = {
  STUDENT_PHOTO_BASE_PATH:
    API_BASE_URL + "/uploads/student/student-profilephoto/",
  TRAINER_PROFILE_PHOTO:
    API_BASE_URL + "/uploads/trainer/trainer-profilephoto/",
  EVENT_BANNER: API_BASE_URL + `/uploads/events/banner/`,
  EVENT_GALLERY_IMAGE: API_BASE_URL + `/uploads/events/gallery/`,
  WEBINAR_SPEAKER_PHOTO: API_BASE_URL + `/uploads/webinar/speakers/`,
  FEEDBACK_PROFILE: API_BASE_URL + `/uploads/feedback/profiles/`,
  COURSE_NOTES: API_BASE_URL + `/uploads/course-notes/`,
};

// console.log(API_BASE_URL, "base url link");
