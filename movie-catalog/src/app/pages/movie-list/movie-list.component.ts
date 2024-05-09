import { Component } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: Movie[];
  
  constructor(private movieApiService: MovieApiService) {
  this.movies = [];
  }
  
  /*loadMovies = async () => {
  this.movies = await this.movieApiService.getAll();
  };*/
  loadMovies = () => {
    this.movieApiService.getAll().subscribe((movies) => (this.movies = movies));
    
  }
  ngOnInit(): void {
  this.loadMovies();
  }
  
  // onShowSellerList(sellers: Seller[]) {
  // this.sellers = sellers;
  // this.showSellerList = true;
  // }
  
  // onCloseSellerList() {
  // this.showSellerList = false;
  // }
    
}
