import { fetchItem } from "../config";
import { postRequestWithoutAuthReturnData } from "../utils/api";

export const fetchByStoreId = async (data) => {
  const network = 1;
  try {
    const res = await postRequestWithoutAuthReturnData(
      `${fetchItem}bystoreid?network=${network}`,
      data
    );
    const items = res.Items.filter((item) => item.state === "ACTIVE");
    return items;
  } catch (err) {
    console.log(err);
  }
  return;
};
