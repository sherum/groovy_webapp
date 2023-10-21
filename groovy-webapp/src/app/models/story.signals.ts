import {computed, Signal, signal} from "@angular/core";
import {IStory,newStory} from "./story.model";
import {group} from "@angular/animations";

const title = signal("Frantic");
const author = signal("Overwiley");
const genre = signal("Thriller");
const maguffin = signal("A man's wife disappears at a gas stop.");
const summary = signal("A man must convince local authorities his wife has been abducted.");

const nstory:Signal<void> = computed(()=>
{
  newStory.title =title();
  newStory.author=author();
  newStory.genre =genre();
  newStory.maguffin= maguffin();
  newStory.summary = summary();
})


