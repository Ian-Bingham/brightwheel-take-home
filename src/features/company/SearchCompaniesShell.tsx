import { useQuery } from "@tanstack/react-query";
import { CompanyList } from "./components/CompanyList";

export const SearchCompaniesShell = () => {
	const { isPending, isError, data } = useQuery({
		queryKey: ["search-companies"],
		queryFn: async () => {
			const resp = await fetch(
				"http://localhost:3001/search?_page=1&_limit=10"
			);
			const data = await resp.json();

			return data;
		},
	});

	if (isPending) return <p>Loading...</p>;
	if (isError) return <p>Error...</p>;

	return <CompanyList companies={data} />;
};
