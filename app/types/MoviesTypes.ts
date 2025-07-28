export interface MovieType {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface MoviesResponseType {
    page: number,
    results: MovieType[],
    total_pages: number,
    total_results: number
}

export interface MoviesPaginationType {
    page: number,
    totalPages: number,
    totalResults: number,
}

export interface MovieDetailsType extends Omit<MovieType, 'genre_ids'> {
    belongs_to_collection?: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    }
    budget: number
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    imdb_id: string
    origin_country: string[]
    production_companies: {
        id: number
        logo_path: string | null
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    revenue: number
    runtime: number
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: string
    tagline: string
}