const rootPath = "/";

export const PAGES = {
  root: rootPath,
  AUTH: "/auth",
  HOME: `${rootPath}`,
  SCHEDULE: "/schedule",
  SEARCH_SCHEDULE: `/search/schedule`,
  SEARCH_FREE_AUDIENCE: `/search/free-audience`,
  RATING: "/rating",
  PROFILE: "/profile",
  TEACHERS: "/teachers",
  SCHEDULE_TEACHER: (id: string) => `/schedule/teacher/${id}`,
  DIRECTORY: "/directory",
  DIRECTORY_CERTIFICATE: `/directory/certificate`,
  RESERVATIONS: "/profile/reservations",
};
