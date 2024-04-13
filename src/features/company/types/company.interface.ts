interface Address {
	address1: string;
	address2?: string;
	city: string;
	state: string;
	postalCode: string;
}

export interface Company {
	id: string;
	starred: boolean;
	name: string;
	description: string;
	address: Address;
	image?: string;
}
