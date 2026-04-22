const rootPath = "/";

export const PAGES = {
  root: rootPath,
  AUTH: "/auth",
  HOME: `${rootPath}`,
  SEARCH: `/search`,
  RATING: "/rating",
  PROFILE: "/profile",
  TEACHERS: "/teachers",
  DIRECTORY: "/directory",
  DIRECTORY_CERTIFICATE: `/directory/certificate`,
  SINGLE_TEACHER: (id: string) => `/teachers/${id}`,
};
