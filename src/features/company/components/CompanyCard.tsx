import { Company } from "../types/company.interface";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import NoImage from "../../../assets/NoImage.avif";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "../services/companies.services";

import css from "./CompanyCard.module.css";

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

			queryClient.invalidateQueries({ queryKey: ["fetch-starred-companies"] });
		},
	});

	const handleClick = () => {
		const updates = {
			starred: !company.starred,
		};

		mutate({ id: company.id, updates });
	};

	const getStar = () => {
		if (isPending) {
			return <CircularProgress />;
		}

		return (
			<StarIcon
				sx={{
					color: company.starred ? "gold" : "#d8d8d8",
				}}
			/>
		);
	};

	if (isError)
		return (
			<Alert severity="error">
				An error occured during update. Please try again.
			</Alert>
		);

	return (
		<Card
			raised
			onClick={handleClick}
			sx={{
				marginBottom: "16px",
				height: "100%",
				position: "relative",
				cursor: "pointer",
			}}
		>
			<div className={css.starIconContainer}>{getStar()}</div>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe">
						<CardMedia
							component="img"
							image={company.image || NoImage}
							title="Profile picture of company"
						/>
					</Avatar>
				}
				title={company.name}
				subheader={company.description}
			/>

			<CardContent>
				<Typography
					color="text.secondary"
					sx={{ display: "flex", flexDirection: "column" }}
				>
					<span>{company.address.address1}</span>
					<span>{company.address.address2}</span>
					<span>
						{company.address.city}, {company.address.postalCode}{" "}
						{company.address.state}
					</span>
				</Typography>
			</CardContent>
		</Card>
	);
};
