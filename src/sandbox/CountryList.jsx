import React, { useState } from 'react';
import { CircularProgress, Box, TextField } from '@mui/material';
import CountryTable from '../components/CountryTable';
import useCountries from './hooks/useCountries';

const columns = [
	{ id: 'flag', label: 'Flag', minWidth: 50 },
	{ id: 'name', label: 'Name', minWidth: 150 },
	{ id: 'capital', label: 'Capital', minWidth: 100 },
	{ id: 'currency', label: 'Currency', minWidth: 100 },
	{ id: 'language', label: 'Language', minWidth: 100 },
];

const CountryList = () => {
	const { countries, loading, setCountries } = useCountries();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');

	const handleSort = () => {
		const sortedCountries = [...countries].sort((a, b) => {
			return sortOrder === 'asc'
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		});

		setCountries(sortedCountries);
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		setPage(0);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
		setPage(0);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
	);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" mt={5}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box p={2}>
			<TextField
				id="standard-search"
				label="Search countries"
				type="search"
				variant="standard"
				fullWidth
				value={searchTerm}
				onChange={handleSearchChange}
				sx={{ mb: 2, width: 250 }}
			/>
			<CountryTable
				countries={filteredCountries}
				columns={columns}
				page={page}
				rowsPerPage={rowsPerPage}
				onPageChange={(e, newPage) => setPage(newPage)}
				onRowsPerPageChange={(e) => {
					setRowsPerPage(+e.target.value);
					setPage(0);
				}}
				handleSort={handleSort}
				sortOrder={sortOrder}
			/>
		</Box>
	);
};

export default CountryList;
