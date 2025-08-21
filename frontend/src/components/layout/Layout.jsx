import { Footer } from './Footer'
import { Header } from './Header'
import '../../styles/app.css'

export const Layout = ({ children }) => {
	return (
		// <div className="layout-wrapper">
		// 	<NavigationBar />
		// 	<div className="under-navbar">
		// 		{loggedInUser && <SideBar />}
		// 		<div className="main-content">
		// 			<Outlet />
		// 		</div>
		// 	</div>
		// </div>
		<div className="app">
			<Header />
			<div className="under-navbar">{children}</div>
			{/* <Footer /> */}
		</div>
	)
}
