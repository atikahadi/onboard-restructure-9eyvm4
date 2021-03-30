import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { UserChecklist } from "./checklist.model";

@Injectable({
  providedIn: "root"
})
export class ChecklistService {
  private apiUrl = "api/checklist";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  getUserChecklist(): Observable<UserChecklist> {
    // return this.http.get<interfaceExplore>(this.api_url);
    return this.http
      .get<UserChecklist>(this.apiUrl)
      .pipe(catchError(this.handleError<UserChecklist>("getUserChecklist")));
  }

  updateUserChecklists(
    userchecklist: UserChecklist,
  ): Observable<void> {
    return this.http
      .put<void>(this.apiUrl, {
        lists: userchecklist[0].lists,
        completed: userchecklist[0].completed,
        completedDate: userchecklist[0].completedDate,
        surveyComplete: userchecklist[0].surveyComplete,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
