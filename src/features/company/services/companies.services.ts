import { urlWithParams } from "../../../utils/urlWithParams";
import { Company } from "../types/company.interface";

const BASE_URL = "http://localhost:3001";
const SEARCH_ENDPOINT = "/search";

export const fetchCompanies = async (
	params: Record<string, string>
): Promise<Company[]> => {
	const url = `${BASE_URL}${SEARCH_ENDPOINT}`;
	const fullUrl = urlWithParams({ url, params });

	const resp = await fetch(fullUrl);
	const data = await resp.json();

	return data;
};
