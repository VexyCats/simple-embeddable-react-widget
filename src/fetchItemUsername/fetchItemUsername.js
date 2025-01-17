import { fetchCurrentItem } from "../config";
import { getRequestWithoutAuth } from "../utils/api";

function preparePaginationQuery(data) {
  const params = {
    ...data,
    // size: (data && data.size) || 8,
    // lastKey: (data && data.lastKey) || 0,
  };
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

export const fetchByUsername = async (data) => {
  const query = preparePaginationQuery(data);
  const network = 1;
  try {
    const res = await getRequestWithoutAuth(
      fetchCurrentItem + "?" + query + `&network=${network}`
    );
    const items = res.Items.filter((item) => item.state === "ACTIVE");
    return items;
  } catch (err) {
    console.log(err);
  }
  return;
};
