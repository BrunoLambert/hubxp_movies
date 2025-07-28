'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField'
import { searchMovies } from '@/app/actions/movies';
import { useDebounce } from '@/app/hooks/useDebounce';
import { HubXPAppContext } from '@/app/providers/hubxpapp-provider';

interface SearchInputProps { }

const SearchInput: React.FunctionComponent<SearchInputProps> = () => {
    const { updateMoviesListInformation, setAppLoading } = React.useContext(HubXPAppContext)

    const [searchText, setSearchText] = React.useState<string>("")

    const debounceSearch = useDebounce(searchText, 500)

    const handleSearchInputChange = async (inputValue: string) => {
        setSearchText(inputValue)
    }

    React.useEffect(() => {
        if (debounceSearch) {
            const handler = async () => {
                try {
                    setAppLoading(true)
                    updateMoviesListInformation({ page: 1, results: [], total_pages: 1, total_results: 1 }, debounceSearch)
                    const { data } = await searchMovies(debounceSearch)
                    console.log("SEARCH INPUT", data)
                    updateMoviesListInformation(data, debounceSearch)
                    setAppLoading(false)
                } catch (error) {
                    console.error(error)
                }
            }
            handler()
        }
    }, [debounceSearch])

    return (
        <TextField
            id="search_field"
            variant='outlined'
            label="Vamos procurar pelo seu próximo filme?"
            placeholder='Estou pensando em assistir...'
            fullWidth
            value={searchText}
            onChange={(event) => { handleSearchInputChange(event.target.value) }}
        />
    );
}

export default SearchInput;