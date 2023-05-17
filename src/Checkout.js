import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import SubTotal from './SubTotal'

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue()
    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img src='https://images-eu.ssl-images-amazon.com/images/G/31/gateway-2015/amazonshop/Desktop_Banner_Recruitment_Website.jpg'
                    className='checkout_ad'
                />
                <div >
                    <h3>Hello, {user ? user?.email : 'There'}</h3>
                    <h2 className='checkout__title'>Your Shopping Cart</h2>
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
            <div className='checkout__right'>
                <SubTotal />
            </div>
        </div>
    )
}

export default Checkout