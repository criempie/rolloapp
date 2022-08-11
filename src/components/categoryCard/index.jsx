import SubCategory from './subCategory'

const CategoryCard = (props) => {
	const { imageSrc, title, subCategories } = props

	return (
		<div className="bg-slate-900 whaaaat group break-inside-avoid mt-16 overflow-hidden rounded-2xl">

			<div className="relative overflow-hidden isolate">
				<img src={imageSrc}
						 className="h-74 group-hover:scale-110 transition-all duration-300 bg-slate-900 w-full object-cover -z-10" />
				<div className="h-44 bg-gradient-to-t inset-x-0 from-slate-900 w-full absolute bottom-0" />
				<h2 className="text-4xl text-white font-custom absolute bottom-4 left-8">
					{title}
				</h2>
			</div>

			<div className="p-8 ">
				<ul className="flex gap-3 flex-wrap">
					{subCategories.map(c => <SubCategory label={c.name} key={c.id} />)}
				</ul>
			</div>

		</div>
	)
}

export default CategoryCard