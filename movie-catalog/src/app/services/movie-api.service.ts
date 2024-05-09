import { Injectable } from '@angular/core';
import { Movie } from "../model/movie.model";
import { movieMockCollection } from './movie-api.mock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class MovieApiService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Movie[]> {
    console.log(this.http.get<Movie[]>('http://localhost:3001/movies'))
      return this.http.get<Movie[]>('http://localhost:3001/movies');
      //movieMockCollection
    //);


  /*constructor() { }


  getAll(): Promise<Movie[]> {
    return Promise.resolve(
      movieMockCollection
    );*/
}
Insert(movie: Movie): Observable<Movie> {
  //movieMockCollection.push(movie);
  return this.http.post<Movie>(`http://localhost:3001/movies`, movie);

  }
Modify(movie: Movie | any, id:any): Observable<Movie> {
    //movieMockCollection.push(movie);
  return this.http.put<Movie>(`http://localhost:3001/movies/`+id, movie);
  
}
}


// @Injectable({
//   providedIn: 'root' 
// })
// export class MovieApiService {

//   constructor(private http: HttpClient) {}

//   getAll(): Observable<Movie[]> {
//       return this.http.get<Movie[]>('http://localhost:3001/movies');
//       //movieMockCollection
//     //);
// }
// Insert(movie: Movie): Promise<Movie> {
//   movieMockCollection.push(movie);
//   return Promise.resolve(movie);
//   }
// }

  