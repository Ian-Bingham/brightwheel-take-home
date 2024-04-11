import { Company as CompanyInterface } from "../types/company.interface";
import NoImage from "../../../assets/NoImage.avif";

export const CompanyCard = ({ company }: { company: CompanyInterface }) => {
	return (
		<div>
			<img
				src={company.image || NoImage}
				alt="Profile picture of company"
				width="200px"
				height="200px"
			/>
			<p>Name: {company.name}</p>
			<p>Description: {company.description}</p>
			<p>Address: {company.address.address1}</p>
			<p>Starred: {`${company.starred}`}</p>
		</div>
	);
};
