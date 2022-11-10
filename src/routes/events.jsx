import Header   from '../components/header'
import Event    from '../components/event'
import events   from '../plugs/events.json'

const Events = (props) => {
	const {} = props

	return (
		<>
			<Header />
			<div className="grid md:grid-cols-3 gap-10 mb-20">

				<div className="max-w-3xl md:col-start-2 md:col-span-2">
					<div className="flex mb-5 justify-between items-center">
						<h1 className="text-5xl text-rose-500 font-custom font-bold">We found something interesting</h1>
					</div>
					<p className="opacity-80">A collection of the best events for you, your family and friends.</p>
				</div>
			</div>
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-16">
				{events.map((e, i) => <Event category={e.category}
																		 imageSrc={e.imageSrc}
																		 date={e.date}
																		 title={e.title}
																		 location={e.location}
																		 price={e.price} key={i} />)}
			</div>
		</>
	)
}

export default Events