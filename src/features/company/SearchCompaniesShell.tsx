import { CompanyList } from "./components/CompanyList";
import { ChangeEvent, useState } from "react";

export const SearchCompaniesShell = () => {
	const [search, setSearch] = useState("");

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<>
			<input
				style={{ width: "100%" }}
				type="search"
				placeholder="Search for a company..."
				value={search}
				onChange={handleSearchChange}
			/>
			<CompanyList search={search} />
		</>
	);
};
