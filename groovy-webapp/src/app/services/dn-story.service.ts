import {Injectable, signal} from '@angular/core';
import {defaultStory, IEvent, ILocation, IPerson, IPlot, IScene, IStory, IThing} from "../models/story.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService} from "./cognito.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DnStoryService {


    user: string | undefined;
    currentDnStory = signal<IStory>(defaultStory);
    currentDnPlot = signal<IPlot>({name: "default"});
    currentDnPerson = signal<IPerson>({name: "new person"});
    currentDnLocation = signal<ILocation>({name: "new location"});
    currentDnEvent = signal<IEvent>({name: "new event"});
    currentDnThing = signal<IThing>({name: "new thing"});
    currentDnScene = signal<IScene>({name: "new scene"});
    dnStoryEndpoint = "http://localhost:8080/dnstory";
    headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});


    constructor(private http: HttpClient, private auth: CognitoService) {

    }

    updateCurrentStory(story: IStory) {
        this.currentDnStory.update(() => story);
        console.log("after current Dnstory update, ", this.currentDnStory());
    }

    updateCurrentPlot(plot: IPlot) {
        this.currentDnPlot.update(() => plot);
        console.log("after current Dnplot update, ", this.currentDnPlot());
    }

    updateCurrentPerson(person: IPerson) {
        this.currentDnPerson.update(() => person);
        console.log("after current Dnperson update, ", this.currentDnPerson());
    }

    updateCurrentDnLocation(location: ILocation) {
        this.currentDnLocation.update(() => location);
        console.log("after current DnLocation update, ", this.currentDnLocation());
    }

    updateCurrentDnEvent(event: IEvent) {
        this.currentDnEvent.update(() => event);
        console.log("after current DnEvent update, ", this.currentDnEvent());
    }

    updateCurrentDnThing(thing: IThing) {
        this.currentDnThing.update(() => thing);
        console.log("after current DnThing update, ", this.currentDnThing());
    }

    updateCurrentDnScene(scene: IScene) {
        this.currentDnScene.update(() => scene);
        console.log("after current DnScene update, ", this.currentDnScene());
    }

    getStories(): Observable<IStory[]> {
        return this.http.get<IStory[]>(this.dnStoryEndpoint, {headers: this.headers});
    }


    newStory(): Observable<IStory> {
        return this.http.post<IStory>(this.dnStoryEndpoint, {}, {})
    }

    updateStory(): void {
        this.http.put<IStory>(this.dnStoryEndpoint, this.currentDnStory(), {headers: this.headers}).subscribe({
            next: data => this.updateCurrentStory(data),
            error: err => console.log("error ", err),
            complete: () => this.getStories().subscribe(data => console.log("Update result", data))
        })
    }

    delete(id: string): Observable<any> {
        let uri = `${this.dnStoryEndpoint}/${id}`;
        return this.http.delete(uri, {headers: this.headers});
    }

    addPLot(): void {
        let uri = `${this.dnStoryEndpoint}/newPlot`;
        this.http.put<IStory>(uri, this.currentDnStory().id, {headers: this.headers}).subscribe(
            data => this.updateCurrentStory(data)
        );
    }

    addPerson(): void {
        let uri = `${this.dnStoryEndpoint}/newPerson`;
        this.http.put<IStory>(uri, this.currentDnStory().id, {headers: this.headers}).subscribe(
            data => this.updateCurrentStory(data)
        );
    }

    addEvent(): void {
        let uri = `${this.dnStoryEndpoint}/newEvent`;
        this.http.put<IStory>(uri, this.currentDnStory().id, {headers: this.headers}).subscribe(
            data => this.updateCurrentStory(data)
        );
    }
    addLocation(): void {
        let uri = `${this.dnStoryEndpoint}/newLocation`;
        this.http.put<IStory>(uri, this.currentDnStory().id, {headers: this.headers}).subscribe(
            data => this.updateCurrentStory(data)
        );
    }

    addThing(): void {
        let uri = `${this.dnStoryEndpoint}/newThing`;
        this.http.put<IStory>(uri, this.currentDnStory().id, {headers: this.headers}).subscribe(
            data => this.updateCurrentStory(data)
        );
    }

     addScene(): void {
        let uri = `${this.dnStoryEndpoint}/newScene`;
        this.http.put<IStory>(uri, this.currentDnStory().id, {headers: this.headers}).subscribe(
            data => this.updateCurrentStory(data)
        );
    }




}
