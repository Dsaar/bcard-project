import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { getToken } from '../services/localStorageService';
import ENDPOINTS from '../../../shared/api/endpoints';
import { useSnack } from '../../../app/providers/SnackBarProvider';
import ConfirmDialog from '../../../shared/components/ConfirmDIalog';

const mapUser = (u) => ({
	id: u._id,
	...u.name,
	email: u.email,
	phone: u.phone,
	isAdmin: u.isAdmin,
	isBusiness: u.isBusiness,
	_id: u._id,
});

export default function CRMUsers() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dialog, setDialog] = useState({ open: false, row: null, busy: false });

	const [searchParams] = useSearchParams();
	const setSnack = useSnack();

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(ENDPOINTS.users.all, {
					headers: { 'x-auth-token': getToken() },
				});
				const users = Array.isArray(data) ? data : data.users;
				setRows(users.map(mapUser));
			} catch (e) {
				console.error('Failed to fetch users', e);
				setSnack('error', 'Failed to fetch users');
			} finally {
				setLoading(false);
			}
		})();
	}, [setSnack]);

	const q = (searchParams.get('q') || '').toLowerCase();
	const filteredRows = useMemo(
		() =>
			rows.filter(
				(u) =>
					(u.first || '').toLowerCase().includes(q) ||
					(u.last || '').toLowerCase().includes(q) ||
					(u.email || '').toLowerCase().includes(q) ||
					(u.phone || '').toLowerCase().includes(q)
			),
		[rows, q]
	);

	const handleToggleBusiness = async (userId) => {
		try {
			await axios.patch(
				ENDPOINTS.users.toggleBusinessStatus(userId),
				{},
				{ headers: { 'x-auth-token': getToken() } }
			);
			setRows((prev) =>
				prev.map((u) => (u._id === userId ? { ...u, isBusiness: !u.isBusiness } : u))
			);
			setSnack('success', 'Business status updated.');
		} catch (e) {
			console.error(e);
			setSnack('error', 'Failed to update status.');
		}
	};

	const openDeleteDialog = (row) => setDialog({ open: true, row, busy: false });
	const closeDeleteDialog = () => setDialog((d) => (d.busy ? d : { open: false, row: null, busy: false }));

	const confirmDelete = async () => {
		if (!dialog.row?._id) return;
		setDialog((d) => ({ ...d, busy: true }));
		try {
			await axios.delete(ENDPOINTS.users.deleteUser(dialog.row._id), {
				headers: { 'x-auth-token': getToken() },
			});
			setRows((prev) => prev.filter((u) => u._id !== dialog.row._id));
			setSnack('success', 'User deleted successfully.');
			setDialog({ open: false, row: null, busy: false });
		} catch (e) {
			console.error(e);
			setSnack('error', 'Failed to delete user.');
			setDialog((d) => ({ ...d, busy: false }));
		}
	};

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
				<Button variant="outlined" size="small" onClick={() => handleToggleBusiness(params.row._id)}>
					{params.row.isBusiness ? 'Revoke' : 'Make Business'}
				</Button>
			),
		},
		{
			field: 'deleteUser',
			headerName: 'Delete User',
			width: 150,
			renderCell: (params) => (
				<Button variant="outlined" size="small" color="error" onClick={() => openDeleteDialog(params.row)}>
					Delete
				</Button>
			),
		},
	];

	return (
		<Box sx={{ height: 600, width: '100%', p: 3 }}>
			<DataGrid
				rows={filteredRows}
				columns={columns}
				loading={loading} 
				initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
				pageSizeOptions={[5, 10, 20]}
				disableRowSelectionOnClick
			/>

			{!loading && filteredRows.length === 0 && (
				<Typography sx={{ mt: 2 }} color="text.secondary">
					No users to show
				</Typography>
			)}

			<ConfirmDialog
				open={dialog.open}
				title="Delete user?"
				content={
					dialog.row
						? `This will permanently delete "${dialog.row.first || ''} ${dialog.row.last || ''}" (${dialog.row.email}).`
						: 'This action cannot be undone.'
				}
				confirmText="Delete"
				confirmColor="error"
				loading={dialog.busy}
				onClose={closeDeleteDialog}
				onConfirm={confirmDelete}
			/>
		</Box>
	);
}
