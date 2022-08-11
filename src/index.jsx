import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/home'
import './computedStyles/tailwind.output.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<div className={'text-xl text-slate-800'}>
		<BrowserRouter>
			<div className={'p-10 lg:p-20 bg-gradient-to-bl from-purple-300 via-rose-200 to-sky-200'}>
				<Routes>
					<Route path={'/'} element={<Home />} />

				</Routes>
			</div>
		</BrowserRouter>
	</div>
)
