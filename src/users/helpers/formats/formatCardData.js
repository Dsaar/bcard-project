export function formatCardData(data) {
	return {
		title: data.title,
		subtitle: data.subtitle,
		description: data.description,
		phone: data.phone,
		email: data.email,
		web: data.web,
		image: {
			url: data.imageUrl,
			alt: data.imageAlt,
		},
		address: {
			state: data.state,
			country: data.country,
			city: data.city,
			street: data.street,
			houseNumber: data.houseNumber,
			zip: data.zip,
		},
	};
}
