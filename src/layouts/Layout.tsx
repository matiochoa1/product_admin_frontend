import { Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<>
			<header className="bg-slate-800">
				<div className="max-w-6xl py-10 mx-auto">
					<h1 className="text-4xl font-extrabold text-white">
						Administrador de Productos
					</h1>
				</div>
			</header>

			<main className="max-w-6xl p-10 mx-auto mt-10 bg-white rounded-sm shadow">
				<Outlet />
			</main>
		</>
	);
};
