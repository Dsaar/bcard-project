import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

const CountryTableHead = ({ columns }) => (
	<TableHead>
		<TableRow>
			{columns.map((column) => (
				<TableCell key={column.id} style={{ minWidth: column.minWidth }}>
					{column.label}
				</TableCell>
			))}
		</TableRow>
	</TableHead>
);

export default CountryTableHead;
