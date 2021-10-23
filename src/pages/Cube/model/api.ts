import { client } from "../../../http/Clients";
// import { TDices } from "./types";

const URL = `/dices`;

export async function rollDicesFetch(params?: any): Promise<any> {
  return await (
    await client.get(URL, params)
  ).data;
}

// export async function fetchInitFields(params?: any): Promise<any> {
//     return await (await client.get(URL, params)).data;
//   }
