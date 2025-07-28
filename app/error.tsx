'use client' // Error boundaries must be Client Components

import { Typography } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return <div className='flex flex-col min-h-[100vh] w-full items-center justify-center text-purple-800'>
        <Typography variant='h1' component="h1">
            500
        </Typography>
        <Typography component="h2">
            Houve um erro
        </Typography>
        <button
            onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }
        >
            Tente novamente
        </button>
    </div>
}