'use client' // Error boundaries must be Client Components

import { Typography } from '@mui/material';
import * as React from 'react';

export default function NotFound() {
    return <div className='flex flex-col min-h-[100vh] w-full items-center justify-center text-purple-800'>
        <Typography variant='h1' component="h1">
            404
        </Typography>
        <Typography component="h2">
            Página não encontrada
        </Typography>
    </div>
}