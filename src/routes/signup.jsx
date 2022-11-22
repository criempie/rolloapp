import axios from 'axios'
import React from 'react'

import { useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REST_URL } from '../config'

const Signup = (props) => {
	const { } = props

	const navigate = useNavigate()

	const [error, setError] = useState("")

	const valuesRef = useRef({
		username: "",
		fullname: "",
		mail: "",
		phone: "",
		bdate: "",
		sex: "",
		pswd: "",
		c_pswd: "",
	});

	const handleSubmit = useCallback(event => {
		event.preventDefault()

		if (Object.entries(valuesRef.current).some(([name, value]) => {
			if (value === "") {
				setError(`${name} must not be empty`)
				return true
			}
		})) {
			return
		}

		if (valuesRef.current.pswd !== valuesRef.current.c_pswd) {
			setError("passwords must match")
			return
		}

		sendValues(valuesRef.current)
	}, [valuesRef])

	const handleChange = useCallback((event) => {
		if (event.target?.name) {
			valuesRef.current[event.target.name] = event.target.value
		}
	}, [valuesRef])

	const sendValues = useCallback((values) => {
		const url = new URL('regform', REST_URL)

		axios.post(url.href, values)
			.then(() => navigate("/"))
			.catch(e => {
				if (axios.isAxiosError(e) && e.response?.statusText) setError(e.response?.statusText)
				else setError("Internal server error")
			})
	}, [])

	return (
		<div className="min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl font-custom font-bold text-center">Sign up</h1>
					<form onSubmit={handleSubmit}>
						<span>{error}</span>

						<input
							onChange={handleChange}
							type="text"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="username"
							placeholder="Login" />

						<input
							onChange={handleChange}
							type="text"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="fullname"
							placeholder="Full Name" />

						<input
							onChange={handleChange}
							type="email"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="mail"
							placeholder="Email" />

						<input
							onChange={handleChange}
							type="phone"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="phone"
							placeholder="Phone" />

						<input
							onChange={handleChange}
							type="date"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="bdate"
						/>
						<ul className="grid grid-cols-2 gap-x-5 mb-5 max-w-md mx-auto">
							<li className="relative">
								<input onChange={handleChange} className="sr-only peer" type="radio" value="m" name="sex" id="answer_yes" />
								<label
									className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent"
									htmlFor="answer_yes">Man</label>

								<div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
									🙎
								</div>
							</li>
							<li className="relative">
								<input onChange={handleChange} className="sr-only peer" type="radio" value="f" name="sex" id="answer_no" />
								<label
									className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-pink-500 peer-checked:ring-2 peer-checked:border-transparent"
									htmlFor="answer_no">Woman</label>

								<div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
									👩
								</div>
							</li>
						</ul>
						<input
							onChange={handleChange}
							type="password"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="pswd"
							placeholder="Password" />
						<input
							onChange={handleChange}
							type="password"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="c_pswd"
							placeholder="Confirm Password" />

						<button
							type="submit"
							className="bg-purple-500 text-white w-full px-4 py-3 rounded-xl"
						>Create Account
						</button>
					</form>

					<div className="text-center text-sm text-grey-dark mt-4">
						{'By signing up, you agree to the '}
						<Link to={'#'}>
							<span className="no-underline border-b border-grey-dark text-grey-dark">
								Terms of Service
							</span>
						</Link>
						{' and '}
						<Link to={'#'}>
							<span className="no-underline border-b border-grey-dark text-grey-dark">
								Privacy Policy
							</span>
						</Link>
					</div>
				</div>
				<div className="text-grey-dark mt-6">
					{'Already have an account? '}
					<Link to={'/signin'}>
						<span className="no-underline border-b border-blue text-blue">
							Log in.
						</span>
					</Link>
				</div>
			</div>
		</div>

	)
}

export default Signup