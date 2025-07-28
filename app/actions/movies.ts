'use server'

import { prepareRequest } from "../helpers/requests"
import { MovieDetailsType, MoviesResponseType } from "../types/MoviesTypes"

export async function searchMovies(searchText: string, page?: number) {
    try {

        const { status, data } = await prepareRequest({
            method: "GET",
            prefix: "search/movie",
            data: {
                language: "pt-BR",
                page: page ? String(page) : "1",
                include_adult: false,
                query: searchText
            }
        })

        return { status, data } as { status: number, data: MoviesResponseType }
    } catch (error: unknown) {
        console.error(error)
        throw error
    }
}

export async function getMovieDetails(movieID: number) {
    try {

        const { status, data } = await prepareRequest({
            method: "GET",
            prefix: `movie/${movieID}`,
            data: { language: 'pt-BR' }
        })

        return { status, data } as { status: number, data: MovieDetailsType }
    } catch (error: unknown) {
        console.error(error)
        throw error
    }
}