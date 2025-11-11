import axios from 'axios'
import Swal from 'sweetalert2'
import useAuth from '../../Hooks/useAuth'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
// import useAxios from '../../Hooks/useAxios'

const CreateAProduct = () => {
  const { user } = useAuth()
  //   const axiosInstance = useAxios()
  const axiosSecure = useAxiosSecure()

  const handleCreateAProduct = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const image = e.target.image.value
    const price_min = e.target.price_min.value
    const price_max = e.target.price_max.value
    console.log(title, image, price_min, price_max)

    const newProduct = {
      title,
      image,
      price_min,
      price_max,
      email: user.email,
      seller_name: user.displayName,
    }

    // axios.post('https://smart-deals-server-ochre.vercel.app/products', newProduct).then((data) => {
    //   console.log(data.data)
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: 'Your bid has been placed',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     })
    //   }
    // })

    axiosSecure.post('/products', newProduct).then((data) => {
      console.log(data.data)
    })
    // axiosInstance.post('/products', newProduct).then((data) => {
    //   console.log(data.data)
    // })
  }

  return (
    <div className="lg:w-1/2 mx-auto">
      <form className="" onSubmit={handleCreateAProduct}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="title" className="input w-full" />
          <label className="label">Image URL</label>
          <input type="text" name="image" className="input w-full" />

          <label className="label">Price_min</label>
          <input type="text" name="price_min" className="input w-full" placeholder="Price_min" />

          <label className="label">Price_max</label>
          <input type="text" name="price_max" className="input w-full" placeholder="Price_max" />

          <button className="btn btn-neutral mt-4">Create A Product</button>
        </fieldset>
      </form>
    </div>
  )
}

export default CreateAProduct
