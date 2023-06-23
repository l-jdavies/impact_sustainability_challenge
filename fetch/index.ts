import { WretchError } from "wretch/resolver";
import wretch from "wretch";

const BASE_URL = "https://impact-code-test.fly.dev";

/* using wretch - a wrapper around fetch - https://github.com/elbywan/wretch#motivation */
export const fetchAllElectricity = async () => {
  const fetchAllUrl = `${BASE_URL}/fetch-data`;

  return wretch(fetchAllUrl)
    .get()
    .json((res) => res)
    .catch((err: WretchError) => {
      /* return empty array if no data found */
      if (err.status === 404 || !err.json) return [];
      return err.json;
    });
};
