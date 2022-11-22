import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import Header                                                from '../components/header'
import CategoryCard                                          from '../components/categoryCard'
import axios                                                 from 'axios'
import { REST_URL }                                          from '../config'
import { useNavigate }                                       from 'react-router-dom'

const initialState = []

const reducer = (state, action) => {
	console.log(action)

	switch (action.type) {
		case 'init': {
			return Object.entries(action.payload)
									 .map(([ id, type ]) => ({
										 ...type,
										 id,
										 subTypes: Object.entries(type.subTypes)
																		 .map(
																			 ([ id, subtype ]) => ({
																				 id,
																				 name: subtype
																			 }))
									 }))
		}

		default: {
			throw new Error()
		}
	}
}

const Home = (props) => {
	const {} = props

	const navigate = useNavigate()

	const [ categories, dispatch ] = useReducer(reducer,
		initialState)
	const selectedSubTypes = useRef([])

	useEffect(() => {
		const controller = new AbortController()
		const url = new URL('subtypes', REST_URL)

		axios.get(url.href, {
			signal: controller.signal
		})
				 .then(res => dispatch(
					 { type: 'init', payload: res.data }))
				 .catch(e => !axios.isCancel(e))

		return () => controller.abort()
	}, [])

	const selectSubType = useCallback(
		id => {
			!selectedSubTypes.current.includes(id) && selectedSubTypes.current.push(id)
		},
		[])

	const unselectSubType = useCallback(id => {
		const index = selectedSubTypes.current.indexOf(id)
		index !== -1 && selectedSubTypes.current.splice(index, 1)
	}, [])

	const handleClickEventPage = useCallback(() => {
		const url = new URL('test_show', REST_URL)
		axios.post(url.href, selectedSubTypes.current)
				 .then(() => navigate('/events'))
	}, [])

	return (
		<>
			<Header />
			<div className="grid md:grid-cols-3 gap-10 mb-20">
				<div className="max-w-3xl md:col-start-2 md:col-span-2">
					<h1 className="mb-5 text-5xl text-rose-500 font-custom font-bold">Hi!
						Let's get to know each other
					</h1>
					<p className="opacity-80">Tell us your favorite
						events, and we'll help you find the right ones.
						The more likes
						you have, the more accurate our search will be.
					</p>
				</div>
			</div>
			<div className="md:columns-2 xl:columns-3 gap-16">
				{categories.map(
					c => <CategoryCard imageSrc={c.picture}
														 onSelect={selectSubType}
														 onUnselect={unselectSubType}
														 title={c.name}
														 subCategories={c.subTypes}
														 key={c.id} />)}
			</div>
			<span onClick={handleClickEventPage}
						className="fixed z-50  bottom-5 left-5 right-5 md:left-auto md:bottom-20 md:right-16 px-10 hover:bg-rose-600 py-6 rounded-2xl bg-rose-500 text-white font-medium font-custom flex gap-10 group duration-300 transition-all md:hover:translate-x-4 items-center justify-center">
				{'Show me what you have'}
				<svg xmlns="http://www.w3.org/2000/svg"
						 className="h-6 w-6 group-hover:translate-x-4 transition-all duration-300"
						 fill="none"
						 viewBox="0 0 24 24"
						 stroke="currentColor"
						 strokeWidth="2">
					<path strokeLinecap="round"
								strokeLinejoin="round"
								d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</span>
		</>
	)
}

export default Home
