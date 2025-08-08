import React from 'react'
import CountryList from '../sandbox/CountryList'
import Parent from '../sandbox/providersExample/Parent'
import MessageProvider from '../sandbox/providers/SpecialMessageProvider'
import { useCurrentUser } from '../users/providers/UserProvider'
import { Navigate } from 'react-router-dom'
import Counter from '../sandbox/components/Counter'
import CRMUsers from '../users/components/CRMUsers'
import { Container } from '@mui/material'
import PageHeader from '../components/PageHeader' 

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

			{/* <CountryList /> */}
			{/* <MessageProvider><Parent /></MessageProvider> */}
			{/* <Counter /> */}
			<CRMUsers />
		</Container>
	)
}

export default SandboxPage
