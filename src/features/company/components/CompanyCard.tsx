import { Company } from "../types/company.interface";
import NoImage from "../../../assets/NoImage.avif";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "../services/companies.services";

export const CompanyCard = ({
	company,
	search,
}: {
	company: Company;
	search: string;
}) => {
	const queryClient = useQueryClient();

	const { mutate, isPending, isError } = useMutation({
		mutationKey: ["update-company"],
		mutationFn: ({
			id,
			updates,
		}: {
			id: string;
			updates: Partial<Company>;
		}) => {
			return updateCompany({ id, updates });
		},
		onSuccess: (data: Company) => {
			queryClient.setQueryData(
				["search-companies", search],
				(currentCompanies: Company[]) => {
					return currentCompanies.map((currentCompany) => {
						if (currentCompany.id === data.id) {
							return data;
						}

						return currentCompany;
					});
				}
			);
		},
	});

	const handleClick = () => {
		const updates = {
			starred: !company.starred,
		};

		mutate({ id: company.id, updates });
	};

	const getStarred = () => {
		if (isPending) return "Loading...";
		if (isError) return "An error occured. Please try again";

		return `${company.starred}`;
	};

	return (
		<div
			onClick={handleClick}
			style={{
				cursor: "pointer",
				border: "1px solid black",
				marginBottom: "16px",
			}}
		>
			<img
				src={company.image || NoImage}
				alt="Profile picture of company"
				width="200px"
				height="200px"
			/>
			<p>Name: {company.name}</p>
			<p>Description: {company.description}</p>
			<p>Address: {company.address.address1}</p>
			<p>Starred: {getStarred()}</p>
		</div>
	);
};
