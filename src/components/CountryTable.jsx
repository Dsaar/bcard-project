import React from 'react';
import {
	Paper,
	Table,
	TableContainer,
	Typography,
	Box,
} from '@mui/material';
import CountryTableHead from './CountriesTableHead'
import CountryTableBody from './CountriesTableBody'
import PaginationControls from './PaginationControls';
import SortBtn from './SortBtn';

const CountryTable = ({
	countries,
	columns,
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
	handleSort,
	sortOrder

}) => {
	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, pb: 8 }}>
			<Typography variant="h6" sx={{ padding: 2 }}>
				Country List
			</Typography>

			<Box sx={{ px: 2 }}>
				<SortBtn onClick={handleSort} order={sortOrder} />
			</Box>

			<TableContainer sx={{ maxHeight: 600 }}>
				<Table stickyHeader aria-label="country table">
					<CountryTableHead columns={columns} />
					<CountryTableBody
						countries={countries}
						columns={columns}
						page={page}
						rowsPerPage={rowsPerPage}
					/>
				</Table>
			</TableContainer>

			<PaginationControls
				count={countries.length}
				page={page}
				rowsPerPage={rowsPerPage}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
			/>
		</Paper>
	);
};

export default CountryTable;
