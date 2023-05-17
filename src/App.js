import React, { useEffect } from 'react'
import Header from './Header'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import Payment from './Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const promise = loadStripe(
	'pk_test_51KqZYiBsLACWkwtwHCg3Xydhn7loExLE8zIHClWY3awumBnFvNqavZlovR8QuwX8UBoZbWGfNTfqaORvolp1VGWj00POfpQdlo'
)

function App() {
	const [{}, dispatch] = useStateValue()

	useEffect(
		() =>
			auth.onAuthStateChanged((authUser) => {
				console.log('The user is >>>>>>', authUser)
				if (authUser) {
					dispatch({
						type: 'SET_USER',
						user: authUser,
					})
				} else {
					dispatch({
						type: 'SET_USER',
						user: null,
					})
				}
			}),
		[]
	)
	return (
		<BrowserRouter>
			<div className='app'>
				<Routes>
					<Route
						path='/login'
						element={
							<>
								<Login />
							</>
						}
					/>
					<Route
						path='/checkout'
						element={
							<>
								<Header />
								<Checkout />
							</>
						}
					/>
					<Route
						path='/payment'
						element={
							<>
								<Header />
								<Elements stripe={promise}>
									<Payment />
								</Elements>
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								<Header />
								<Home />
							</>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
