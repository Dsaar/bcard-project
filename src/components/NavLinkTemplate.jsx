
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavLinkTemplate({ to, label, style = {}, activeStyle = {} }) {
	const location = useLocation();
	const isActive = location.pathname === to;

	const baseStyle = {
		display: 'flex',
		alignItems: 'center',
		padding: '8px 16px',
		textDecoration: 'none',
		color: 'white',
		height: '100%',
		...style,
		...(isActive ? activeStyle : {})
	};

	return (
		<Link to={to} style={baseStyle}>
			{label}
		</Link>
	);
}

export default NavLinkTemplate;
