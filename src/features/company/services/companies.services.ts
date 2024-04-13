import { urlWithParams } from "../../../utils/urlWithParams";
import { Company } from "../types/company.interface";

const BASE_URL = "http://localhost:3001";
const SEARCH_ENDPOINT = `${BASE_URL}/search`;

export const fetchCompanies = async (
	params: Record<string, string>
): Promise<Company[]> => {
	const fullUrl = urlWithParams({ url: SEARCH_ENDPOINT, params });
	const resp = await fetch(fullUrl);

	return await resp.json();
};

export const updateCompany = async ({
	id,
	updates,
}: {
	id: string;
	updates: Partial<Company>;
}) => {
	const resp = await fetch(`${SEARCH_ENDPOINT}/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updates),
	});

	return await resp.json();
};
