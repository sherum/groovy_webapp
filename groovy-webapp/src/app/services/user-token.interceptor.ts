import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StoryService} from "./story.service";

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {

  constructor(private storyService: StoryService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`UserTokenInterceptor - ${request.url}`);

    let req: HttpRequest<any> =request.clone();
    console.log(`UserTokenInterceptor`, req);
  return next.handle(req);
  }
}
