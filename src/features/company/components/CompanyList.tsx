import { useQuery } from "@tanstack/react-query";

import { CompanyCard } from "./CompanyCard";
import { fetchCompanies } from "../services/companies.services";
import "./CompanyList.styles.css";

const CURRENT_PAGE = 1;
const SEARCH_LIMIT = 10;

export const CompanyList = ({ search }: { search: string }) => {
	const { isPending, isError, data } = useQuery({
		queryKey: ["search-companies", search],
		queryFn: async () => {
			const params = {
				_page: `${CURRENT_PAGE}`,
				_limit: `${SEARCH_LIMIT}`,
				q: search,
			};

			return await fetchCompanies(params);
		},
	});

	if (isPending) return <p>Loading...</p>;
	if (isError) return <p>Error...</p>;
	if (!data.length) return <p>No results found</p>;

	return (
		<ul className="company-list">
			{data.map((company) => (
				<li key={company.id}>
					<CompanyCard company={company} search={search} />
				</li>
			))}
		</ul>
	);
};
