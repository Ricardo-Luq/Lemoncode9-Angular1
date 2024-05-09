import { Component, Input } from '@angular/core';
import { Movie } from '../model/movie.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.css'
})
export class CardMovieComponent {
  @Input() movie!: Movie;
  constructor(private router: Router) {}
  handleImageClick() {
  this.router.navigate(['/edit', this.movie.name]);
  }
    
}
