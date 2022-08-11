import React    from "react"
import { Link } from "react-router-dom"

const Header = (props) => {
	const {} = props

	return (
		<header className={"flex justify-between items-center mb-20"}>
			<Link to={"/"}>
				<img src="./images/logo.webp" className={"w-24 sm:w-40"} alt="Logo" />
			</Link>
			<div className="flex gap-5">
				<Link to={"/"}><span className={"text-purple-600 hover:opacity-70"}>Home</span></Link>
				<Link to={"/about"}><span className={"text-purple-600 hover:opacity-70"}>About</span></Link>
				<Link to={"/posts"}><span className={"text-purple-600 hover:opacity-70"}>Posts</span></Link>
			</div>
		</header>
	)
}

export default Header