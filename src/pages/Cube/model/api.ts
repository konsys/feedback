import { client } from "../../../http/Clients";
import { TDices } from "./types";

const URL = `/dices`;

export const rollDicesFetch = async () => (await client.get<TDices>(URL)).data;
