import { MovieType } from '@/app/types/MoviesTypes';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

interface MovieCardProps {
    movie: MovieType,
    onClick?: (movieID: number) => void
}

const MovieCard: React.FunctionComponent<MovieCardProps> = ({ movie, onClick = () => { } }) => {
    return (
        <Card className='h-full transition-all duration-300 hover:scale-[1.1] cursor-pointer rounded-xl hover:bg-purple-200' elevation={4} onClick={() => onClick(movie.id)}>
            <CardHeader
                title={
                    <Typography variant="h6" color="initial" component="h2" className='line-clamp-1'>
                        {movie.title}
                    </Typography>
                }
            />
            <CardMedia
                component="img"
                image={
                    movie.poster_path ?
                        `https://image.tmdb.org/t/p/w342${movie.poster_path}` :
                        "/sem_poster.png"
                }
                alt={`Poster ${movie.title}`}
                className='h-[483px]'
                loading='lazy'
            />
            <CardContent>
                <Typography variant="body1" color="initial" component="p" className='line-clamp-3'>
                    {movie.overview || "..."}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MovieCard;