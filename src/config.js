export const API_BASE_URL=import.meta.env.VITE_APP_API_BASE_URL;

export const DIR = {
    STUDENT_PHOTO_BASE_PATH : API_BASE_URL+'/uploads/student/student-profilephoto/',
    TRAINER_PROFILE_PHOTO : API_BASE_URL+'/uploads/trainer/trainer-profilephoto/',
     EVENT_BANNER : API_BASE_URL+`/uploads/events/banner/`,
 EVENT_GALLERY_IMAGE : API_BASE_URL+`/uploads/events/gallery/`,
  WEBINAR_SPEAKER_PHOTO: API_BASE_URL+`/uploads/webinar/speakers/`, // ✅ Add this
  FEEDBACK_PROFILE: API_BASE_URL+`/uploads/feedback/profiles/`,
  COURSE_NOTES: API_BASE_URL+`/uploads/course-notes/`
}

console.log(API_BASE_URL,"base url link");