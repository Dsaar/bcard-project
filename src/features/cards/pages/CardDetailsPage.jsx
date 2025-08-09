import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Box,
	Typography,
	Grid,
	Paper,
	Divider,
	CircularProgress,
	Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
import ENDPOINTS from '../../../shared/api/endpoints';
import { getToken } from '../../users/services/localStorageService';
import { useSnack } from '../../../app/providers/SnackBarProvider';
import { useCurrentUser } from '../../../app/providers/UserProvider';

// Components
import InfoRow from '../../../shared/components/common/InfoRow';
import DeleteConfirmationDialog from '../../../shared/components/common/DeleteConfirmationDialog';

function CardDetailsPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useCurrentUser();
	const [card, setCard] = useState(null);
	const [loading, setLoading] = useState(true);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const setSnack = useSnack();

	useEffect(() => {
		const fetchCard = async () => {
			try {
				const response = await axios.get(ENDPOINTS.cards.single(id));
				setCard(response.data);
			} catch (error) {
				console.error('Error fetching card:', error);
				setSnack('error', 'Failed to load card.');
			} finally {
				setLoading(false);
			}
		};

		fetchCard();
	}, [id, setSnack]);

	const handleDelete = async () => {
		try {
			const token = getToken();
			await axios.delete(ENDPOINTS.cards.single(id), {
				headers: { 'x-auth-token': token },
			});
			setSnack('success', 'Card deleted successfully.');
			setDeleteDialogOpen(false);
			navigate('/');
		} catch (error) {
			console.error('Delete failed:', error);
			setSnack('error', 'Failed to delete card.');
		}
	};

	const isOwner = user && card && (user._id === card.user_id || user._id === card.userId);

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!card) {
		return (
			<Typography variant="h6" align="center" sx={{ mt: 5 }}>
				Card not found.
			</Typography>
		);
	}

	return (
		<Box sx={{ p: 3, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
			<Paper elevation={4} sx={{ p: 4, borderRadius: 3, maxWidth: '900px', width: '100%' }}>
				{/* Header Buttons */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
					<Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
						Back to Cards
					</Button>
					{isOwner && (
						<Box>
							<Button
								variant="contained"
								color="primary"
								sx={{ mr: 1 }}
								startIcon={<EditIcon />}
								onClick={() => navigate(`/edit-card/${id}`)}
							>
								Edit
							</Button>
							<Button
								variant="outlined"
								color="error"
								startIcon={<DeleteIcon />}
								onClick={() => setDeleteDialogOpen(true)}
							>
								Delete
							</Button>
						</Box>
					)}
				</Box>

				{/* Title */}
				<Typography variant="h4" align="center" gutterBottom>
					{card.title}
				</Typography>
				<Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
					{card.subtitle}
				</Typography>
				<Divider sx={{ my: 3 }} />

				{/* Card Image on Top */}
				<Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
					<Box
						component="img"
						src={card.image?.url}
						alt={card.image?.alt || "Card image"}
						sx={{
							borderRadius: 2,
							boxShadow: 3,
							objectFit: "cover",
							maxHeight: 300,
							maxWidth: "100%",
						}}
					/>
				</Box>

				{/* Details Layout */}
				<Grid container spacing={4}>
					{/* Contact Info */}
					<Grid item xs={12} md={6}>
						<Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
							Contact Information
						</Typography>
						<InfoRow icon={<PhoneIcon />} label="Phone" value={card.phone} width={'250px'} />
						<InfoRow icon={<EmailIcon />} label="Email" value={card.email} fullWidth />
						<InfoRow icon={<LanguageIcon />} label="Website" value={card.web} fullWidth />
					</Grid>

					{/* Address Info */}
					<Grid item xs={12} md={6}>
						<Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
							Address
						</Typography>
						<InfoRow icon={<HomeIcon />} label="Street" value={card.address?.street} width={'250px'} />
						<InfoRow icon={<LocationCityIcon />} label="City" value={card.address?.city} fullWidth />
						<InfoRow icon={<PublicIcon />} label="Country" value={card.address?.country} fullWidth />
						<InfoRow icon={<BusinessIcon />} label="Zip Code" value={card.address?.zip} fullWidth />
					</Grid>

					{/* Business Info */}
					<Grid item xs={12}>
						<Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
							Business Details
						</Typography>
						<InfoRow icon={<BusinessIcon />} label="Business Number" value={card.bizNumber} width={'250px'} />
						<InfoRow
							icon={<FavoriteIcon color="error" />}
							label="Likes"
							value={`${card.likes?.length || 0} Likes`}
							fullWidth
						/>
						<InfoRow
							icon={<InfoIcon />}
							label="Description"
							value={card.description || 'No description provided.'}
							fullWidth
						/>
					</Grid>
				</Grid>
			</Paper>

			{/* Delete Confirmation Dialog */}
			<DeleteConfirmationDialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				onConfirm={handleDelete}
			/>
		</Box>
	);
}

export default CardDetailsPage;
