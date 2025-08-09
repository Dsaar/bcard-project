import ROUTES from '../../router/routesDictionary';

export const getNavLinks = (user) => {
	const links = [
		{ to: ROUTES.root, label: 'Home' },
		{ to: ROUTES.about, label: 'About' }
	];

	if (!user) return links;

	if (user.isBusiness || user.isAdmin) {
		links.push({ to: ROUTES.myCards, label: 'My Card' });
	}

	links.push({ to: ROUTES.favorite, label: 'Favorite Card' });

	if (user.isAdmin) {
		links.push({ to: ROUTES.sandbox, label: 'CRM' });
	}

	return links;
};
