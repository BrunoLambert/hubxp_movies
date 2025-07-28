import Typography from '@mui/material/Typography'
import SearchInput from "./components/search/SearchInput";
import MovieList from "./components/movie/MovieList";
import { Grid } from "@mui/material";


export default function Home() {
  return (
    <div className="max-w-[1360px] m-auto min-h-[100vh] flex flex-col">
      <main className="flex-1 my-5">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <section about="hubxp-movies-header" className="flex flex-col items-center">
              <img src="/hubxp_logo.png" height="auto" width="200px" />
              <Typography variant="subtitle1" color="black" component="h2" fontStyle="italic" align="center" className="mt-2 md:mt-0">
                A melhor seleção de filmes que você só acha por aqui
              </Typography>
            </section>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <section about="movie-search" className="flex items-end h-full">
              <SearchInput />
            </section>
          </Grid>
        </Grid>

        <div className="mt-8">
          <MovieList />
        </div>
      </main>

      <footer>
        Footer
      </footer>
    </div>
  );
}
