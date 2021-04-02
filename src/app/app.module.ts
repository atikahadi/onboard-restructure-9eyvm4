import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { KonamiModule } from "./utilities/konami/konami.module";
import { LottieModule } from "./utilities/lottie/lottie.module";

import { AppComponent } from "./app.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HomeComponent } from "./modules/home/home.component";
import { ExploreComponent } from "./modules/explore/explore.component";
import { AboutComponent } from "./modules/about/about.component";
import { LoginComponent } from "./modules/login/login.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { ChecklistComponent } from "./modules/checklist/checklist.component";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/in-memory-data.service";
import { fakeBackendProvider } from "./services/authentication/fake.interceptor";

import { JwtInterceptor } from "./services/authentication/jwt.interceptor";
import { ErrorInterceptor } from "./services/authentication/error.interceptor";

import { AuthenticationService } from "./services/authentication/authentication.service";
import { UserService } from "./services/user/user.service";
import { GamificationComponent } from "./modules/gamification/gamification.component";
import { FilterPipe } from "./utilities/filter/filter.pipe";
import { OsomComponent } from "./modules/osom/osom.component";
import { TetrisComponent } from "./modules/tetris/tetris.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    AppRoutingModule,
    NgbModule,
    KonamiModule,
    LottieModule,
  ],
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    ExploreComponent,
    AboutComponent,
    LoginComponent,
    DashboardComponent,
    ChecklistComponent,
    GamificationComponent,
    FilterPipe,
    OsomComponent,
    TetrisComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,

    AuthenticationService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
