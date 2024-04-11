import { Company } from "../types/company.interface";
import { CompanyCard } from "./CompanyCard";

export const CompanyList = ({ companies }: { companies: Company[] }) => {
	return (
		<>
			{companies.map((company) => (
				<CompanyCard key={company.id} company={company} />
			))}
		</>
	);
};
