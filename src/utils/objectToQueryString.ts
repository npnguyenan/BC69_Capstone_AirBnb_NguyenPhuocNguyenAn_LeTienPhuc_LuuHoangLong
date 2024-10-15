import { stringify } from "qs";

// Record<string, unknown>: định nghĩa kiểu dữ liệu là 1 object
type ObjectToQueryStringParams = Record<string, unknown>;

/**
 * @param obj: Object
 * @returns query string
 * @author Tiến Phúc
 */

export const objectToQueryString = (obj: ObjectToQueryStringParams) => {
  return stringify(obj, {
    addQueryPrefix: true,
  });
};
