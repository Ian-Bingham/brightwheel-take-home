export const urlWithParams = ({
	url,
	params,
}: {
	url: string;
	params: Record<string, string>;
}) => {
	const query = new URLSearchParams(params);

	return `${url}?${query}`;
};
