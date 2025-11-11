import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const instance = axios.create({
  baseURL: 'https://smart-deals-server-ochre.vercel.app',
})

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()

  // set token in the header for all the api call using axiosSecure hook

  useEffect(() => {
    // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user.accessToken
      if (token) {
        config.headers.authorization = `Bearer ${token}`
      }
      return config
    })

    // response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        const status = err.status
        if (status === 401 || status === 403) {
          console.log('log out the user for bad request')
          signOutUser().then(() => {
            // navigate user to the login page
            navigate('/register')
          })
        }
      }
    )

    return () => {
      instance.interceptors.request.eject(requestInterceptor)
      instance.interceptors.response.eject(responseInterceptor)
    }
  }, [user, signOutUser, navigate])

  // request interceptor
  //   instance.interceptors.request.use((config) => {
  //     config.headers.authorization = `Bearer ${user.accessToken}`
  //     return config
  //   })

  return instance
}

export default useAxiosSecure
