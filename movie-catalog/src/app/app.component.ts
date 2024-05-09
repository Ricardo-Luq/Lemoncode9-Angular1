import { Component } from '@angular/core';
// import { Movie } from './model/movie.model';
// import { MovieApiService } from './services/movie-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'movie-catalog';
  constructor(){

  }
  ngOnInit():void{

  }
  // movies: Movie[];

  // constructor(private movieApiService: MovieApiService) {
  //   this.movies = [
  //     new Movie('bladerunner', 'indie studio', '2021', 'https://github.com/Lemoncode/angular-lab-2023/blob/main/media/bladerunner.png?raw=true'),
  //     new Movie('interestellar', 'indie studi2', '2022', 'https://github.com/Lemoncode/angular-lab-2023/blob/main/media/interstellar.png?raw=true'),
  //   ];
  // }

  // ngOnInit(): void {


  // }
}
