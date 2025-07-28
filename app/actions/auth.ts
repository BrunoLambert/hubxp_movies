// 'use server'

// import { prepareRequest } from "../helpers/requests"

// export async function checkAuth() {
//     const { url, options } = await prepareRequest({ method: "GET", prefix: "authentication" })

//     try {
//         const response = await fetch(url, options)
//         return response.json()
//     } catch (error: any) {
//         console.error(error)
//         return new Error(error)
//     }
// }

// export async function createRequestToken() {
//     try {
//         const response = await prepareRequest({ method: "GET", prefix: "authentication/token/new" })

//         return response.json()
//     } catch (error: any) {
//         console.error(error)
//         return new Error(error)
//     }
// }

// export async function createGuestSession() {
//     const { url, options } = await prepareRequest({ method: "GET", prefix: "authentication/guest_session/new" })

//     try {
//         const response = await fetch(url, options)
//         return response.json()
//     } catch (error: any) {
//         console.error(error)
//         return new Error(error)
//     }
// }