import * as React from 'react';
import { render, screen, fireEvent } from "@testing-library/react"
import MovieCard from '../MovieCard';
import MovieMock from '@/app/helpers/tests/MovieMock';

describe("MovieCard", () => {
    it("must render all movie basic info", () => {
        const mockData = MovieMock()
        render(<MovieCard movie={mockData} />)

        expect(screen.getByText(mockData.title)).toBeInTheDocument()
        expect(screen.getByText(mockData.overview)).toBeInTheDocument()

        const movieImage = screen.getByRole("img") as HTMLImageElement
        expect(movieImage.src).toContain(mockData.poster_path)
    })

    it("must render the falback movie poster", () => {
        const mockData = { ...MovieMock(), poster_path: "" }
        render(<MovieCard movie={mockData} />)

        const movieImage = screen.getByRole("img") as HTMLImageElement
        expect(movieImage.src).toContain("/sem_poster.png")
    })

    it("must render ... when it has no overview", () => {
        const mockData = { ...MovieMock(), overview: "" }
        render(<MovieCard movie={mockData} />)

        expect(screen.getByText("...")).toBeInTheDocument()
    })

    it("must fire the click event on click", () => {
        const mockData = MovieMock()
        const handleClick = jest.fn()
        render(<MovieCard movie={mockData} onClick={handleClick} />)

        fireEvent.click(screen.getByRole("img"))

        expect(handleClick).toHaveBeenCalledWith(mockData.id)
    })
})