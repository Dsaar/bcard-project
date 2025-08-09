import React from 'react';
import { TableBody, TableRow, TableCell, Avatar } from '@mui/material';

const CountryTableBody = ({ countries, columns, page, rowsPerPage }) => (
  <TableBody>
    {countries
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((country) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={country.key}>
          {columns.map((column) => {
            const value = country[column.id];
            return (
              <TableCell key={column.id}>
                {column.id === 'flag' ? (
                  <Avatar src={value} alt="flag" variant="rounded" />
                ) : (
                  value
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
  </TableBody>
);

export default CountryTableBody;
