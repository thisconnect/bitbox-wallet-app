import { apiGet } from '../utils/request';

export const getNativeLocale = (): Promise<string> => {
  return apiGet('native-locale');
};

export const getNativeNumeric = (): Promise<string> => {
  return apiGet('native-numeric');
};