import React from 'react'
import { useCurrentUser } from '../app/providers/UserProvider'
import { Navigate } from 'react-router-dom'
import CRMUsers from '../features/users/components/CRMUsers'
import { Container } from '@mui/material'
import PageHeader from '../shared/components/PageHeader' 

function SandboxPage() {
	const { user } = useCurrentUser()

	if (!user) {
		return <Navigate to={'/'} replace />
	}

	return (
		<Container maxWidth={false} sx={{ paddingBottom: 10 }}>
			<PageHeader
				title="CRM Page"
				description="Manage users, monitor their activity, and maintain business relationships efficiently."
			/>
			<CRMUsers />
		</Container>
	)
}

export default SandboxPage
