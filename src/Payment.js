import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { useStateValue } from './StateProvider'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios'

function Payment() {
    const navigate = Navigate
    const [{ basket, user }, dispatch] = useStateValue()
    const [error, setError] = useState(null)
    const [disable, setDisable] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [clientSecret, setClientSecret] = useState(true)

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket)} * 100`
            })
            setClientSecret(response.data.clientSecret)
        }
    }, [basket])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payLoad = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            navigate('/orders')
        })
    }
    const handleChange = e => {
        setDisable(e.empty)
        setError(e.error ? e.error.message : '')
    }
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>Checkout {<Link to='/checkout'>({basket?.length})</Link>}</h1>
                <div className='payment__section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Multan, Punjab</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.img}
                                rating={item.rating}
                            />
                        ))}

                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContaoner'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Totol : {value}</h3>
                                        </>

                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disable || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                                {error && <div>{error}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment