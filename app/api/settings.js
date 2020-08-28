import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://www.offcampus.dev/api",
  },
  staging: {
    apiUrl: "https://www.offcampus.dev/api",
  },
  prod: {
    apiUrl: "https://www.offcampus.dev/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
