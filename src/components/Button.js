// Sahil Talwar
import Link from "next/link";

export default function Button({ children, title, subtitle, click, href = "/", mode = "button", onClick }) {
	return mode === "navButton" ? (
		<Link href={href} className="text-decoration-none text-black">
			<button className="btn btn-sm rounded-pill text-decoration-none border-dark-subtle bg-white fs-6 lh-lg fw-normal px-4 py-2">
				{children}
			</button>
		</Link>
	) : mode === "card" ? (
		<div className="w-100 ms-5" onClick={onClick}>
			<button className="btn btn-bg-red rounded-pill text-center lh-sm text-white ms-5 py-3 px-4 fw-light w-50">
				<h6>{title}</h6>
				<b>{subtitle}</b>
			</button>
		</div>
	) : href && href !== "/" ? (
		<Link href={href}>
			<button className="btn btn-sm rounded-pill shadow btn-bg-red text-white fs-6 lh-lg fw-normal px-4 py-2">
				{children}
			</button>
		</Link>
	) : mode === "white" ? (
		<Link href={href}>
			<button className="btn btn-sm rounded-pill shadow bg-white text-black fs-6 lh-lg fw-normal px-4 py-2">
				{children}
			</button>
		</Link>
	) : (
		<button
			className="btn btn-sm rounded-pill shadow btn-bg-red text-white fs-6 lh-lg fw-normal px-4 py-2 mb-3"
			onClick={click}
		>
			{children}
		</button>
	);
}
