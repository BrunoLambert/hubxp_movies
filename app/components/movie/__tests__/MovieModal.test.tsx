import * as React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import MovieDetailsMock from '@/app/helpers/tests/MovieDetailsMock';
import MovieModal from '../MovieModal';
import * as movieActions from "@/app/actions/movies"
import { formatDate, formatDecimal, formatRevenue } from '@/app/helpers/formatters';

jest.mock("@/app/actions/movies")

describe("MovieModal", () => {
    it("must render all movie basic info", async () => {
        const mockData = MovieDetailsMock()
        jest.spyOn(movieActions, 'getMovieDetails').mockResolvedValueOnce({ data: mockData, status: 200 })

        render(<MovieModal movieID={mockData.id} />)

        await waitFor(async () => {
            await waitFor(() => {
                expect(screen.getByText(mockData.title)).toBeInTheDocument()
            })

            expect(screen.getByText(mockData.overview)).toBeInTheDocument()

            const formattedDate = formatDate(mockData.release_date)
            const movieReleaseDate = screen.getByTestId("movie-releasedate").textContent
            expect(movieReleaseDate).toContain(formattedDate)

            const formattedBudget = formatRevenue(mockData.budget, "pt-BR", "USD")
            const movieBudget = screen.getByTestId("movie-budget").textContent
            expect(movieBudget).toContain(formattedBudget)

            const formattedRevenue = formatRevenue(mockData.revenue, "pt-BR", "USD")
            const movieRevenue = screen.getByTestId("movie-revenue").textContent
            expect(movieRevenue).toContain(formattedRevenue)

            const formattedRating = formatDecimal(mockData.vote_average)
            const movieRating = screen.getByTestId("movie-rating").textContent
            expect(movieRating).toContain(formattedRating)
            expect(movieRating).toContain(`${mockData.vote_count}`)
        })

    })

    it("it must emit event when close button is triggered", async () => {
        const mockData = MovieDetailsMock()
        jest.spyOn(movieActions, 'getMovieDetails').mockResolvedValueOnce({ data: mockData, status: 200 })
        const handleClose = jest.fn()

        render(<MovieModal movieID={mockData.id} onClose={handleClose} />)

        await waitFor(async () => {
            const closeBtn = screen.getByTestId("movie-close-btn")
            fireEvent.click(closeBtn)
        })

        expect(handleClose).toHaveBeenCalled()
    })
})