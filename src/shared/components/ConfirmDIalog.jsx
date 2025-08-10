import * as React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';

export default function ConfirmDialog({
	open,
	title = 'Are you sure?',
	content = 'This action cannot be undone.',
	confirmText = 'Delete',
	cancelText = 'Cancel',
	onClose,
	onConfirm,
	loading = false,
	confirmColor = 'error', // 'primary' | 'error' | etc.
}) {
	return (
		<Dialog open={open} onClose={loading ? undefined : onClose} keepMounted>
			<DialogTitle>{title}</DialogTitle>
			{content && (
				<DialogContent>
					<DialogContentText>{content}</DialogContentText>
				</DialogContent>
			)}
			<DialogActions sx={{ p: 2 }}>
				<Button onClick={onClose} disabled={loading}>
					{cancelText}
				</Button>
				<Button
					onClick={onConfirm}
					variant="contained"
					color={confirmColor}
					disabled={loading}
				>
					{loading ? 'Deleting…' : confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
