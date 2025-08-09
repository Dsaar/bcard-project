const ROUTES = {
	root: "/",
	about: "/about-page",
	favorite: "/favorite",
	myCards: "/my-cards",
	login: "/login",
	register: "/register",
	sandbox: "/sandbox",
	createCard: "/create-card",
	editCard: "/edit-card/:id",
	cardDetails: '/card/:id',
	cardDetailsDynamic: (id) => `/card/${id}`,
	profile: '/profile',
	profileEdit:'/edit-profile',


};

export default ROUTES;