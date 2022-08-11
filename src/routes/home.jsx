import React        from 'react'
import Header       from '../components/header'
import CategoryCard from '../components/categoryCard'

import categories   from '../plugs/categories.json'

const Home = (props) => {
	const {} = props

	return (
		<>
			<Header />
			<div className="grid md:grid-cols-3 gap-10 mb-20">
				<div className="max-w-3xl md:col-start-2 md:col-span-2">
					<h1 className="mb-5 text-5xl text-rose-500 font-custom font-bold">Hi! Let's get to know each other</h1>
					<p className="opacity-80">Tell us your favorite events, and we'll help you find the right ones. The more likes
						you have, the more accurate our search will be.</p>
				</div>
			</div>
			<div className="md:columns-2 xl:columns-3 gap-16">
				{categories.map(c => <CategoryCard imageSrc={c.imageSrc}
																					 title={c.name}
																					 subCategories={c.subCategories}
																					 key={c.id}/>)}
			</div>
		</>
	)
}

export default Home
