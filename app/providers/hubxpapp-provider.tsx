'use client'

import * as React from 'react';
import { MoviesPaginationType, MoviesResponseType, MovieType } from '../types/MoviesTypes';

interface HubXPAppContextType {
    appLoading: boolean,
    setAppLoading: (state: boolean) => void,
    searchText: string,
    movies: MovieType[],
    moviesPagination: MoviesPaginationType,
    updateMoviesListInformation: (resultInfos: MoviesResponseType, searchText?: string) => void
}

export const HubXPAppContext = React.createContext<HubXPAppContextType>({
    appLoading: false,
    setAppLoading: () => { },
    searchText: "",
    movies: [],
    moviesPagination: {
        page: 1,
        totalPages: 1,
        totalResults: 1
    },
    updateMoviesListInformation: () => { }
})

export default function HubXPAppProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [appLoading, setAppLoading] = React.useState<boolean>(false)
    const [searchText, setSearchText] = React.useState<string>("")
    const [movies, setMovies] = React.useState<MovieType[]>([])
    const [moviesPagination, setMoviesPagination] = React.useState<MoviesPaginationType>({
        page: 1,
        totalPages: 1,
        totalResults: 1
    })

    const updateMoviesListInformation = (resultInfos: MoviesResponseType, searchText?: string) => {
        console.log('MOVIE UPDATE', resultInfos.results)
        setMovies(resultInfos.results)
        setMoviesPagination({
            page: resultInfos.page,
            totalPages: resultInfos.total_pages,
            totalResults: resultInfos.total_results
        })
        if (searchText) setSearchText(searchText)
    }

    return <HubXPAppContext.Provider value={{
        appLoading,
        setAppLoading,
        searchText,
        movies,
        moviesPagination,
        updateMoviesListInformation
    }}>
        {children}
    </HubXPAppContext.Provider>
}