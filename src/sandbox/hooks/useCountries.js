import { useEffect, useState } from 'react';

const useCountries = () => {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getCountries = async () => {
			try {
				const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital');
				const jsonCountries = await res.json();

				const formatted = jsonCountries.map((country) => ({
					flag: country.flags?.png || '',
					name: country.name?.common || 'N/A',
					capital: country.capital?.[0] || 'N/A',
					currency: country.currencies
						? Object.values(country.currencies)[0]?.name || 'N/A'
						: 'N/A',
					language: country.languages
						? Object.values(country.languages)[0] || 'N/A'
						: 'N/A',
					key: country.cca3,
				}));

				setCountries(formatted);
			} catch (error) {
				console.error('Failed to fetch countries:', error);
			} finally {
				setLoading(false);
			}
		};

		getCountries();
	}, []);

	return { countries, loading, setCountries };
};

export default useCountries;
