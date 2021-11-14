import { client } from "../../../http/Clients";
import { TPositionValue } from "./types";

const URL = `/nouns/square`;

export const wordsSquareFetch = async (width: number) =>
  (await client.get<TPositionValue[]>(`${URL}/${width}`)).data;
