import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import StarIcon from "@mui/icons-material/Star";
import Badge from "@mui/material/Badge";

import { CompanyList } from "./components/CompanyList";
import { ChangeEvent, useState } from "react";
import { fetchCompanies } from "./services/companies.services";
import "./SearchCompaniesShell.styles.css";

export const SearchCompaniesShell = () => {
	const [search, setSearch] = useState("");
	const { data } = useQuery({
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

	return (
		<>
			<header>
				<TextField
					label="Search for companies..."
					type="search"
					variant="standard"
					onChange={handleSearchChange}
					sx={{ width: 0.95, marginRight: "12px" }}
				/>
				<Badge badgeContent={data?.length || "0"} color="primary">
					<StarIcon sx={{ color: "gold" }} fontSize="large" />
				</Badge>
			</header>

			<main>
				<CompanyList search={search} />
			</main>
		</>
	);
};
