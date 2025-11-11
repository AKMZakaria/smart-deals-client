import React from 'react'
import LatestProducts from '../LatestProducts/LatestProducts'

const LatestProductsPromise = fetch(
  'https://smart-deals-server-ochre.vercel.app/latest-products'
).then((res) => res.json())

const Home = () => {
  return (
    <div>
      <p>This is home</p>
      <LatestProducts LatestProductsPromise={LatestProductsPromise}></LatestProducts>
    </div>
  )
}

export default Home
