import {
	useNavigate,
	Form,
	ActionFunctionArgs,
	redirect,
	useFetcher,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
	product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
	if (params.id !== undefined) {
		await deleteProduct(+params.id);
		return redirect("/");
	}
}

export default function ProductDetails({ product }: ProductDetailProps) {
	const isAvailable = product.available;

	const fetcher = useFetcher();

	const navigate = useNavigate();

	return (
		<>
			<tr className="border-b ">
				<td className="p-3 text-lg text-center text-gray-800 border-b-2 border-b-gray-300">
					{product.name}
				</td>
				<td className="p-3 text-lg text-center text-gray-800 border-b-2 border-b-gray-300">
					{formatCurrency(product.price)}
				</td>
				<td className="p-3 text-lg text-center text-gray-800 border-b-2 border-b-gray-300">
					<fetcher.Form method="POST">
						<button
							type="submit"
							name="id"
							value={product.id}
							className={`${
								isAvailable
									? "text-white bg-green-700 hover:bg-green-800"
									: "text-white bg-red-600 hover:bg-red-500"
							} rounded-lg p-2 text-xs uppercase font-bold w-full  hover:cursor-pointer `}>
							{isAvailable ? "Disponible" : "No Disponible"}
						</button>
					</fetcher.Form>
				</td>
				<td className="p-3 text-lg text-gray-800 border-b-2 border-b-gray-300">
					<div className="flex items-center gap-2">
						<button
							onClick={() => navigate(`/productos/${product.id}/editar`)}
							className="w-full p-2 text-xs font-bold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
							Editar
						</button>

						<Form
							className="w-full"
							method="POST"
							action={`/productos/${product.id}/eliminar`}
							onSubmit={(e) => {
								if (!confirm("¿Estás seguro de eliminar este producto?")) {
									e.preventDefault();
								}
							}}>
							<input
								type="submit"
								value="Eliminar"
								className="w-full p-2 text-xs font-bold text-center text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-500"
							/>
						</Form>
					</div>
				</td>
			</tr>
		</>
	);
}
