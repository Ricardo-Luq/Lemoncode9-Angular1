import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieEditComponent } from './pages/movie-edit/movie-edit.component';
import { FormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from './common/field-error-display/field-error-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputWrapperComponent } from './common/input-wrapper/input-wrapper.component';
import { HighlightDirective } from './common/directives/highlight.directive';

const appRoutes: Routes = [
 { path: '', component: MovieListComponent },
 { path: 'edit', component: MovieEditComponent },
 { path: 'edit/:name', component: MovieEditComponent },

 ];
  

@NgModule({
  declarations: [
    AppComponent,
    CardMovieComponent,
    MovieListComponent,
    MovieEditComponent,
    FieldErrorDisplayComponent,
    InputWrapperComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
