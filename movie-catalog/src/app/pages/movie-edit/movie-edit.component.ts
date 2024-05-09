import { Component, booleanAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@/model/movie.model';
import { MovieApiService } from '@/services/movie-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mapMovieToVm, mapVmToMovie } from './movie.mapper';
@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css',
})
export class MovieEditComponent {
  name: string;
  director: string;
  year: number;
  poster: string;
  movieForm: FormGroup;
  movies: any;
  constructor(
    private route: ActivatedRoute,
    private movieApi: MovieApiService,
    private formBuilder: FormBuilder
    
  ) {
    
    this.name = '';
    this.director = '';
    this.year = 1900;
    this.poster = '';

    //    this.movie = new Movie("");
    /*this.route.params.subscribe(params => {
    this.name = params['name'];
    });*/

    const movieVm = mapMovieToVm(new Movie('', '', 0, ''));
    this.movieForm = this.formBuilder.group({
      name: [movieVm.name, [Validators.required, Validators.minLength(3)]],
      director: [movieVm.director, [Validators.required, Validators.minLength(3)]],
      poster: [
        movieVm.poster,
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      year: [movieVm.year, [Validators.required, Validators.min(1900), Validators.max(2100)]],
    });
  }

  handleSaveClick() {
    if (this.movieForm.valid) {
      console.log(this.movieForm.value);
      const movie = mapVmToMovie(this.movieForm.value);
      var found = false
      //This will overwrite all movies with a given name if it exists
      this.movieApi.getAll().subscribe((mov:any) => {
        var movies = new Array<any> 
        movies.push(mov)
        movies = movies[0]
        console.log("movies is " + movies +" and movie is " + movie)
        movies.forEach((singleMovie:any) => {
          if(singleMovie.name.trim().toLowerCase() == movie.name.trim().toLowerCase()){
            this.movieApi.Modify(movie, singleMovie.id).subscribe({
              next: (movie:any) =>{
              alert('Pelicula editada correctamente');
              console.log(movie);
              },
              error: (error:any) => {
                console.log("error al editar el objeto.")
                alert('Error al editar la pelicula');
                console.log(error);
              }
            })
            found = true;
          }
        });
        if (!found) {
          this.movieApi.Insert(movie).subscribe({
            next: (movie) => {
              alert('Pelicula insertada correctamente');
              console.log(movie);
            },
            error: (error) => {
              console.log("error al insertar el objeto.")
              alert('Error al insertar la pelicula');
              console.log(error);
            },
          });
        }


      })
     

    } else {
      // TODO: esto habría que hacerlo más limpio, usando por ejemplo una notificación de angular material :)
      alert(
        'Formulario inválido, chequea si hay errores de validación en alguno de los campos del formulario'
      );
    }
  }
}
