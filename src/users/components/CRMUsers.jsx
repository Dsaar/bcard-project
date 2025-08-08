import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { getToken } from '../../users/services/localStorageService';
import ENDPOINTS from '../../api/endpoints';
import { useSearchParams } from 'react-router-dom';
import { useSnack } from '../../providers/SnackBarProvider';
import  useDebounce  from '../../hooks/useDebounce';

function CRMUsers() {
	const [rows, setRows] = useState([]);
	const [filteredRows, setFilteredRows] = useState([]);
	const [searchParams] = useSearchParams();
	const setSnack = useSnack();
	

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = getToken();
				const response = await axios.get(ENDPOINTS.users.all, {
					headers: {
						'x-auth-token': token,
					},
				});

				const users = Array.isArray(response.data)
					? response.data
					: response.data.users;

				const transformed = users.map((user) => ({
					id: user._id,
					...user.name,
					email: user.email,
					phone: user.phone,
					isAdmin: user.isAdmin,
					isBusiness: user.isBusiness,
					_id: user._id,
				}));

				setRows(transformed);
			} catch (error) {
				console.error('Failed to fetch users', error);
			}
		};

		fetchUsers();
	}, []);

	// Apply search filtering
	const q = searchParams.get("q")?.toLowerCase() || "";
	const debouncedQ = useDebounce(q, 300);

	useEffect(() => {
		const filtered = rows.filter(
			(user) =>
				user.first?.toLowerCase().includes(debouncedQ) ||
				user.last?.toLowerCase().includes(debouncedQ) ||
				user.email?.toLowerCase().includes(debouncedQ) ||
				user.phone?.toLowerCase().includes(debouncedQ)
		);
		setFilteredRows(filtered);
	}, [debouncedQ, rows]);

	const handleToggleBusiness = async (userId) => {
		try {
			const token = getToken();

			await axios.patch(
				ENDPOINTS.users.toggleBusinessStatus(userId),
				{},
				{
					headers: { 'x-auth-token': token },
				}
			);

			setRows((prev) =>
				prev.map((user) =>
					user._id === userId
						? { ...user, isBusiness: !user.isBusiness }
						: user
				)
			);

			setSnack('success', 'Business status updated.');
		} catch (error) {
			console.error(error);
			setSnack('error', 'Failed to update status.');
		}
	};

	const handleDeleteUser = async (userId) => {
		const confirm = window.confirm("Are you sure you want to delete this user?");
		if (!confirm) return;

		try {
			const token = getToken();

			await axios.delete(
				ENDPOINTS.users.deleteUser(userId),
				{ headers: { 'x-auth-token': token } }
			);

			setRows((prev) => prev.filter((user) => user._id !== userId));
			setSnack('success', 'User deleted successfully.');
		} catch (error) {
			console.error(error);
			setSnack('error', 'Failed to delete user.');
		}
	}
	const columns = [
		{ field: '_id', headerName: 'ID', width: 200 },
		{ field: 'first', headerName: 'First Name', width: 150 },
		{ field: 'middle', headerName: 'Middle Name', width: 150 },
		{ field: 'last', headerName: 'Last Name', width: 150 },
		{ field: 'email', headerName: 'Email', width: 200 },
		{ field: 'phone', headerName: 'Phone', width: 150 },
		{ field: 'isAdmin', headerName: 'Admin', type: 'boolean', width: 100 },
		{ field: 'isBusiness', headerName: 'Business', type: 'boolean', width: 120 },
		{
			field: 'toggleBusiness',
			headerName: 'Toggle Business',
			width: 180,
			renderCell: (params) => (
				<Button
					variant="outlined"
					size="small"
					onClick={() => handleToggleBusiness(params.row._id)}
				>
					{params.row.isBusiness ? 'Revoke' : 'Make Business'}
				</Button>
			),
		},
		{
			field: 'deleteUser',
			headerName: 'Delete User',
			width: 150,
			renderCell: (params) => (
				<Button
					variant="outlined"
					size="small"
					color="error"
					onClick={() => handleDeleteUser(params.row._id)}
				>
					Delete
				</Button>
			),
		},
	];
	

	return (
		<Box sx={{ height: 600, width: '100%', padding: 3 }}>
			<DataGrid
				rows={filteredRows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { pageSize: 10 },
					},
				}}
				pageSizeOptions={[5, 10, 20]}
				disableRowSelectionOnClick
			/>
		</Box>
	);
}

export default CRMUsers;
