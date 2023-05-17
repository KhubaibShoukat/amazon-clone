import React from 'react'
import "./home.css"
import banner from './images/hero-banner.jpg'
import Product from './Product'

function Home() {
    return (
        <div className='home'>
            <div className='home_container'>
                <img src={banner} className='home_image' />
                <div className='home__row'>
                    <Product
                        id={1}
                        title="PS4"
                        price={329.99}
                        img='https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$1600px--t$'
                        rating={5}
                    />
                    <Product
                        id={2}
                        title="Iphone 13 Pro"
                        price={729.99}
                        img='https://m.media-amazon.com/images/I/71FuI8YvCNL._AC_SY200_.jpg'
                        rating={4}
                    />
                </div>
                <div className='home__row'>
                    <Product
                        id={3}
                        title="HP Laptop"
                        price={529.99}
                        img='https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06424860.png'
                        rating={4}
                    />
                    <Product
                        id={4}
                        title="Iphone 13 Pro"
                        price={729.99}
                        img='https://m.media-amazon.com/images/I/71FuI8YvCNL._AC_SY200_.jpg'
                        rating={2}
                    />
                    <Product
                        id={5}
                        title="Shave Kit"
                        price={19.99}
                        img='https://i.insider.com/5fdb9216d366e60018098aad?width=1000&format=jpeg&auto=webp'
                        rating={5}
                    />
                </div>
                <div className='home__row'>
                    <Product
                        id={6}
                        title="Brush Kit"
                        price={39.99}
                        img='https://marvel-b1-cdn.bc0a.com/f00000000236182/d2hy56m2o6qi9y.cloudfront.net/wp-content/uploads/2019/12/26191044/4.jpg'
                        rating={4}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home