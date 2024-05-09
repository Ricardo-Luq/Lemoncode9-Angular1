# Lemoncode9-Angular1
Lab made for getting a feel for Angular

## Info:
This README only has code snippets relevant to the process, it does not include everything added.

## Tasks:
### Movie list:
__Read data from an API REST which will provide us with a movie list__

in src/app/services/movie-api.service.ts I prepared the api call
```ts
  getAll(): Observable<Movie[]> {
    console.log(this.http.get<Movie[]>('http://localhost:3001/movies'))
    return this.http.get<Movie[]>('http://localhost:3001/movies');
  ]
```

...which I then used in src/app/pages/movie-list/movie-list.component.ts
```ts
  loadMovies = () => {
    this.movieApiService.getAll().subscribe((movies) => (this.movies = movies));
  }
  ngOnInit(): void {
    this.loadMovies();
  }
```

- __Navigation: Tapping on a movie from the list, we'll get to the meeting screen (I left in the menu I made while practicing as well)__

the actual html product (with a click event) is made in src/app/card-movie/card-movie.component.ts
```ts
export class CardMovieComponent {
  @Input() movie!: Movie;
  constructor(private router: Router) {}
  handleImageClick() {
    this.router.navigate(['/edit', this.movie.name]);
  }   
}
```
created through the following html template at src/app/card-movie/card-movie.component.html
```html
<div class="card" (click)="handleImageClick()">
    <div class="card_image"><img [src]="movie.poster" /></div>
    <div class="card_title">
        <div>{{ movie.name }} ({{ movie.year }})</div>
        <div>{{ movie.director }}</div>
    </div>
</div>
```
which is enveloped by src/pages/movie-list/movie-list.component.html
```html
<div *ngFor="let movie of movies">
    <app-card-movie [movie]="movie"></app-card-movie>
</div>
```


### Movie editing & Creating
__Use PUT or PATCH to modify movies from the list__
once again in src/app/services/movie-api.service.ts I prepared the api call
```ts
Insert(movie: Movie): Observable<Movie> {
  return this.http.post<Movie>(`http://localhost:3001/movies`, movie);
}
Modify(movie: Movie | any, id:any): Observable<Movie> {
  return this.http.put<Movie>(`http://localhost:3001/movies/`+id, movie); 
}
```

- __Form validations:__
    - __Picture URL: Required, well formed__
    - __Ttile: Required, minimum 3 characters__
    - __Year: Required, between 1900 and 2100__
    - __Director: Required, minimum 3 characters__
there are a few other steps in between as I used reactive forms, but eventually it gets validation data here (It shows custom messages if the form is wrong as well)
src/app/pages/movie-edit-component.ts
```ts
    this.movieForm = this.formBuilder.group({
      name: [movieVm.name, [Validators.required, Validators.minLength(3)]],
      director: [movieVm.director, [Validators.required, Validators.minLength(3)]],
      poster: [
        movieVm.poster,
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      year: [movieVm.year, [Validators.required, Validators.min(1900), Validators.max(2100)]],
    });
```

custom errors are hosted at src/app/common/field-error-display/field-error-display.component.ts
```ts
 constructor() {
 this.fieldNgModel = null;
 this.fieldErrorObject = {
   required: "Field is required",
   pattern: "Format not valid",
   minlength: "Minimum of 3 characters",
   min: "Release date must be over 1900",
   max: "Release date must be under 2100"
 }
}
```

Here is where the form is processed at. 
Since I wanted to learn how asynchronous functions like subscribe fully work in react, I challenged myself to do it the following way:
src/app/pages/movie-edit/movie-edit.component.ts
```ts
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
          }); //<-these are from subscribe closing
        }
      }); //<-these are from subscribe closing
    } else {
      alert(
        'Formulario inválido, chequea si hay errores de validación en alguno de los campos del formulario'
      );
    }
  }
```
Since I wanted to learn how asynchronous functions like subscribe fully work in react, I challenged myself to do it the following way:
In order to create a movie, write a name that doesn't exist. In order to edit one, type a name that does exist into the form.
(Some text was repeated so that it's not lost amidst the code)

## Server API:
https://github.com/Lemoncode/angular-lab-2023

(I've used the following command to launch it often, as the provided script gave me a few errors here and there.)
(Locate yourself at the server folder first)
```powershell
npx json-server --watch db.json --port 3001
```
