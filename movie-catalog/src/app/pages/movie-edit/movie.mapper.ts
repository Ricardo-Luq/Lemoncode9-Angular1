import { Movie } from "@/model/movie.model";
import { MovieVm } from "./movie.vm";
export const mapMovieToVm = (movie: Movie): MovieVm => ({
 name: movie.name,
 director: movie.director,
 poster: movie.poster ?? "",
 year: movie.year,
});
export const mapVmToMovie = (movieVm: MovieVm): Movie =>
 new Movie(movieVm.name, movieVm.director, movieVm.year, movieVm.poster);
