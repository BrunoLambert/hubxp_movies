'use client'

import { HubXPAppContext } from '@/app/providers/hubxpapp-provider';
import { Card, Grid, Skeleton, CardContent } from '@mui/material';
import * as React from 'react';
import MovieCard from './MovieCard';
import { searchMovies } from '@/app/actions/movies';
import MovieModal from './MovieModal';

const MovieList: React.FunctionComponent = () => {
    const {
        movies,
        updateMoviesListInformation,
        appLoading,
        setAppLoading,
        moviesPagination,
        searchText
    } = React.useContext(HubXPAppContext)

    const loaderRef = React.useRef<HTMLDivElement | null>(null)

    const [modalMovieID, setModalMovieID] = React.useState<number | undefined>()

    const handleMovieCardClick = (movieID: number) => {
        if (movieID) setModalMovieID(movieID)
    }

    React.useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && moviesPagination.page < moviesPagination.totalPages) {
                setAppLoading(true)
                const { data } = await searchMovies(searchText, moviesPagination.page + 1)
                console.log("MOVIE LIST", data)
                updateMoviesListInformation({
                    ...data,
                    results: [...movies, ...data.results]
                })
                setAppLoading(false)
            }
        })

        if (loaderRef.current) observer.observe(loaderRef.current)

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current)
        }
    }, [loaderRef, moviesPagination, searchText, movies, updateMoviesListInformation])

    return (
        <section about='search_movies_list'>
            <Grid container spacing={3} className='mb-4'>
                {movies.map(movie => (
                    <Grid key={movie.id} size={{ xs: 12, md: 3 }}>
                        <MovieCard movie={movie} onClick={handleMovieCardClick} />
                    </Grid>
                ))}
            </Grid>

            {appLoading && (
                <Grid container spacing={{ xs: 6, md: 3 }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid key={index} size={{ xs: 12, md: 3 }}>
                            <Card className='h-full rounded-xl' elevation={4}>
                                <CardContent className='flex flex-col gap-4'>
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <div ref={loaderRef} className="h-8" />
            <MovieModal movieID={modalMovieID} onClose={() => { setModalMovieID(undefined) }} />
        </section>
    );
}

export default MovieList;