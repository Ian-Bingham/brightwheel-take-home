import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import StarIcon from "@mui/icons-material/Star";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useDebounce } from "@uidotdev/usehooks";

import { CompanyList } from "./components/CompanyList";
import { ChangeEvent, useState } from "react";
import { fetchCompanies } from "./services/companies.services";

import css from "./SearchCompaniesShell.module.css";

export const SearchCompaniesShell = () => {
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 300);

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
		if (isFetching) {
			return <CircularProgress />;
		}

		return (
			<Badge badgeContent={data?.length || "0"} color="primary">
				<StarIcon sx={{ color: "gold" }} fontSize="large" />
			</Badge>
		);
	};

	if (isError)
		return (
			<Alert severity="error">
				An error occured fetching stars. Please try again.
			</Alert>
		);

	return (
		<>
			<header className={css.searchHeader}>
				<TextField
					label="Search for companies..."
					type="search"
					variant="standard"
					onChange={handleSearchChange}
					sx={{ width: 0.95, marginRight: "12px" }}
				/>
				{getStarCount()}
			</header>

			<main className={css.mainContent}>
				<CompanyList search={debouncedSearchTerm} />
			</main>
		</>
	);
};
