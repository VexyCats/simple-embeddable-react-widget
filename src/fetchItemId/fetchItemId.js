import { ESSearch, fetchItem } from "../config";
import { getRequestWithoutAuth } from "../utils/api";

export const fetchById = async (id) => {
  // using ES
  try {
    let fetchResult = null;
    let fetchResultES = null;

    await fetch(ESSearch + id)
      .then(async (res) => {
        if (res.status > 200) {
          //try using call to dynamo
          const res = await getRequestWithoutAuth(
            fetchItem + id.split("/")[2] + `?network=1`
          );
          if (res) {
            fetchResultES = res;
            return null;
          } else {
            throw `404: ${id} not available`;
          }
        } else {
          return res.json();
        }
      })
      .then((data) => (fetchResult = data));

    if (fetchResult && fetchResult._source.data.state === "ACTIVE") {
      return fetchResult._source.data;
    }

    if (fetchResultES) {
      return fetchResultES;
    }
  } catch (err) {
    console.warn(err);
  }
};
