import {IPlotView} from "./transform.model";


export interface IPlot {
  name: string;
  id?: string;
  parentId?: string;
  type?: string;
  description?: string;
}

export interface IPerson {

}

export interface IEvent {
}

export interface ILocation {
}

export interface IThing {
}

export interface IScene {
}


export interface IStory {
  title: string;
  id?: string;
  author?: string;
  genre?: string;
  maguffin?: string;
  summary?: string;
  plots?: IPlotView[];
  scenes?: IScene[];
  people?: IPerson[];
  events?: IEvent[];
  locations?: ILocation[];
  things?: IThing[];


}

export class Story implements IStory {

   title = " ";
   author: string | undefined;
   genre: string | undefined;
   id: string | undefined;
   maguffin: string | undefined;
   summary: string | undefined;
   plots = new Array<IPlotView>();
   scenes = new Array<IScene>()
   people = new Array<IPerson>();
   events = new Array<IEvent>();
   locations = new Array<ILocation>();
   things = new Array<IThing>();

  constructor(istory: IStory) {
    this.title = istory.title ? istory.title : " ",
      this.id = istory.id,
      this.author = istory.author,
      this.genre = istory.genre,
      this.summary = istory.summary,
      this.scenes = istory.scenes ? istory.scenes : new Array<IScene>(),
      this.maguffin = istory.maguffin,
      this.plots = istory.plots ? istory.plots : new Array<IPlotView>(),
      this.people = istory.people ? istory.people : new Array<IPerson>(),
      this.events = istory.events ? istory.events : new Array<IEvent>(),
      this.locations = istory.locations ? istory.locations : new Array<ILocation>(),
      this.things = istory.things ? istory.things : new Array<IThing>()
  }




}


export const newStory: IStory = {
  title: "New story",
  id: "0",
  author: "New Author",
  genre: "Fiction",
  maguffin: "A gripping tale",
  summary: "A synopsis of the idea"
}

export const data: IStory[] = [

  {
    "events": [
      {
        "date": "12 May 2017",
        "description": "Flight 1509 explodes",
        "id": "1124",
        "location": "7635",
        "name": "Air Disaster",
        "plot": "asdn",
        "type": "Maguffin"
      }
    ],
    "genre": "mystery",
    "locations": [
      {
        "description": "A pasture over Kentucky, 100 miles NW of the Nashville airport.",
        "id": "7635",
        "name": "Crash site one and two"
      },
      {
        "description": "An unremarkable two story warehouse with basement in the SE side of Nashville's industrial district.",
        "id": "3472",
        "name": "Nashville Bi-Weekly"
      }
    ],
    "maguffin": "A commercial airliner explodes as it prepares for its descent into Nashville",
    "people": [
      {
        "description": "Main character, journalist by trade.",
        "id": "1029",
        "name": "Felicia Martin",
        "type": "PROT"
      },
      {
        "description": "Employeer,editor and owner of Nashville Bi-Weekly",
        "id": "1034",
        "name": "Rex Grambone",
        "type": "SUPP"
      }
    ],
    // name:string;
    // id?:string;
    // parentId?:string;
    // type?:string;
    // description?:string;
    // subplots?:Array<IPlotView>;
    "plots": [
      {
        "name": "main",
        "id": "asdn",
        "parentId": "0",
        "type": "story",
        "description": "An investigation into a specious air disaster creates more questions than it answers as the evidence pushes  progressively more inexplicable root causes.",
        "subplots": []
      },
      {
        "name": "PROT development",
        "id": "1234",
        "parentId": "0",
        "type": "arc",
        "description": "PROT comes to terms with her core beliefs about her faith and what is real.",
        "subplots": []
      },
      {
        "name": "Act 1",
        "id": "djri",
        "parentId": "asdn",
        "type": "story",
        "description": "Felcia's boss puts her in charge of the investigaton knowing she is unhinged.",
        "subplots": []
      },
      {
        "name": "PROT development",
        "id": "5647",
        "parentId": "djri",
        "type": "arc",
        "description": "Establish Felicia is crazy/PTSD coming off her last job.",
        "subplots": []
      }
    ],
    "scenes": [
      {
        "dtg": "12 May 2017:1200",
        "events": [],
        "id": "0926",
        "location": "3472",
        "name": "Grip and Grin",
        "parentId": "djri",
        "people": [
          "1029"
        ],
        "plot": "5647",
        "plotpoints": "Felicia's inappropriate wardrobe and decorum show her disconnct with civil society.",
        "setting": "Felicia arrives while Grambone is briefing the staff in the conference room.",
        "things": []
      }
    ],
    "id": "124567890",
    "summary": "After narrowly escaping her own murder ending her last undercover reporting job,  FM starts a traditional journalist's job the day of an air disaster. Her recent past and her failing sanity immediatly surface as she investigates the airliner's demise.",
    "things": [
      {
        "description": "Felicia's Beretta 21A. A 22 cal pistol she is rarely without .",
        "id": "9384",
        "name": "Buddy"
      }
    ],
    "title": "Explosive Descent"
  }
];
