import React from 'react';
import { TablePagination } from '@mui/material';

const PaginationControls = ({
	count,
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
}) => (
	<TablePagination
		rowsPerPageOptions={[10, 25, 50]}
		component="div"
		count={count}
		page={page}
		rowsPerPage={rowsPerPage}
		onPageChange={onPageChange}
		onRowsPerPageChange={onRowsPerPageChange}
	/>
);

export default PaginationControls;
