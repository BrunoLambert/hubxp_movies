import { getMovieDetails } from '@/app/actions/movies';
import { MovieDetailsType } from '@/app/types/MoviesTypes';
import { Backdrop, CircularProgress, Fade, Grid, Modal, Skeleton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CancelIcon from '@mui/icons-material/Cancel';

import * as React from 'react';
import { formatDate, formatDecimal } from '@/app/helpers/formatters';
import { formatRevenue } from '../../helpers/formatters';

interface MovieModalProps {
    movieID?: number
    onClose?: () => void
}

const MovieModal: React.FunctionComponent<MovieModalProps> = ({ movieID, onClose }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        if (onClose) onClose()
    }

    const [movie, setMovie] = React.useState<MovieDetailsType | undefined>()
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        const handler = async (searchId: number) => {
            handleOpen()
            try {
                setLoading(true)
                const { data } = await getMovieDetails(searchId)
                setMovie(data)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }

        if (movieID) handler(movieID)
    }, [movieID])

    React.useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setMovie(undefined)
            }, 500)
        }
    }, [open])

    React.useEffect(() => {
        history.pushState(null, '', window.location.href)

        const handler = (e: PopStateEvent) => {
            e.preventDefault()
            handleClose()
            history.pushState(null, '', window.location.href)
        }

        window.addEventListener('popstate', handler)

        return () => {
            window.removeEventListener('popstate', handler)
        }
    }, [])

    return (
        <Modal
            aria-labelledby="movie-title"
            aria-describedby="movie-overview"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >

            <Fade in={open}>
                <div className="z-[999] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-[90vw] max-h-[90vh] overflow-y-auto md:overflow-y-visible bg-white border-2 border-purple-200 shadow-xl p-4 rounded-lg">
                    <Grid container spacing={4} className='relative'>
                        <CancelIcon
                            data-testid="movie-close-btn"
                            fontSize="large"
                            color="primary"
                            className='hidden md:flex absolute top-[-30px] right-[-30px] bg-white rounded-[50%] cursor-pointer hover:scale-[1.1] transition-all duration-300 z-[1000]'
                            onClick={handleClose}
                        />
                        <Grid size={{ xs: 12, md: 6 }}>
                            {loading ?
                                <Skeleton variant="rectangular" width="100%" height={500} /> :
                                <img
                                    src={movie?.poster_path ?
                                        `https://image.tmdb.org/t/p/w342${movie.poster_path}` :
                                        "/sem_poster.png"}
                                    alt={`Poster ${movie?.title}`}
                                />
                            }
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} className='md:max-h-[500px] overflow-y-auto'>
                            {loading ?
                                (<div className='flex flex-col gap-3'>
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                    <Skeleton variant="rectangular" width="50%" height={28} />
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                    <Skeleton variant="rectangular" width="50%" height={28} />
                                    <Skeleton variant="rectangular" width="60%" height={28} />
                                    <Skeleton variant="rectangular" width="50%" height={28} />
                                </div>) :
                                (<div>
                                    <Typography id="movie-title" variant="h6" component="h2">
                                        {movie?.title}
                                    </Typography>
                                    {movie?.vote_average && (
                                        <section about='movie-vote-average' className='flex gap-2 items-center'>
                                            <div>
                                                {Array.from({ length: 5 }, (_, i) =>
                                                    i + 1 < (movie.vote_average / 2) ? (
                                                        <StarIcon key={i} className="text-yellow-400" fontSize="small" />
                                                    ) : (
                                                        <StarBorderIcon key={i} className="text-yellow-400" fontSize="small" />
                                                    )
                                                )}
                                            </div>
                                            <Typography data-testid="movie-rating" variant="caption" component="span" alignItems="center" lineHeight={1} className='mt-1'>
                                                {formatDecimal(movie.vote_average)} ({movie.vote_count} votos)
                                            </Typography>
                                        </section>)
                                    }
                                    <Typography id="movie-overview" component="p" sx={{ mt: 2 }}>
                                        {movie?.overview}
                                    </Typography>
                                    <Typography data-testid="movie-releasedate" component="p" sx={{ mt: 2 }}>
                                        Data de lançamento: {formatDate(movie?.release_date || "")}
                                    </Typography>
                                    <Typography data-testid="movie-budget" component="p" sx={{ mt: 2 }}>
                                        Orçamento: {formatRevenue(movie?.budget || 0, "pt-BR", "USD")}
                                    </Typography>
                                    <Typography data-testid="movie-revenue" component="p" sx={{ mt: 2 }}>
                                        Faturamento: {formatRevenue(movie?.revenue || 0, "pt-BR", "USD")}
                                    </Typography>
                                </div>)
                            }
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        </Modal>
    );
}

export default MovieModal;