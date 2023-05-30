import { isArray, pickBy, random, times } from 'lodash';

export default class Utils {
  static getRandomString = (length = 20) =>
    times(length, () => random(35).toString(36)).join('');

  static removeEmptyKeys = (obj: any) => {
    Object.keys(obj).forEach(
      (key) => (obj[key] === '' || obj[key]) && delete obj[key]
    );
  };

  static sanitizeObject = (data: any) =>
    pickBy(data, (v: any) =>
      isArray(v) ? !!v.length : v !== null && v !== undefined && v !== ''
    );
}
