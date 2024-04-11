import { useQuery } from "@tanstack/react-query";
import { CompanyList } from "./components/CompanyList";
import { ChangeEvent, useState } from "react";
import { fetchCompanies } from "./services/companies.services";

export const SearchCompaniesShell = () => {
	const [search, setSearch] = useState("");
	const { isFetching, isError, data } = useQuery({
		queryKey: ["fetch-starred-companies"],
		queryFn: async () => {
			const params = {
				starred: "true",
			};

			return await fetchCompanies(params);
		},
	});

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const getStarCount = () => {
		if (isFetching) return "Loading...";
		if (isError) return "Error....";

		return data?.length || 0;
	};

	return (
		<>
			<input
				style={{ width: "80%", marginRight: "16px" }}
				type="search"
				placeholder="Search for a company..."
				value={search}
				onChange={handleSearchChange}
			/>
			<span>Starred: {getStarCount()}</span>
			<CompanyList search={search} />
		</>
	);
};
