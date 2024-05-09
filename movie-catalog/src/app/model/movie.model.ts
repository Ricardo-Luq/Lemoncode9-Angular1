export class Movie {
  name: string;
  director: string;
  year: number;
  poster?: string;
  constructor(name: string, director: string = '', year: number = 1900, poster?: string) {
    this.name = name;
    this.director = director;
    this.year = year;
    this.poster = poster;
  }

}
