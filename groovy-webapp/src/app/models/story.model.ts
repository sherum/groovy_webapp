export interface IPlot {
    name: string;
    id?: string;
    description?: string;
    type?: string;
    parentId?: string;
    subplots?: IPlot[];
}


export interface IPerson {
    name: string;
    id?: string;
    type?: string;
    description?: string;
}

export interface IEvent {
    name: string;
    id?: string;
    description?: string;
    location?:string;
    date?:string;
    plot?:string;
    type?:string;
}

export interface ILocation {
    name: string;
    id?: string;
    description?: string;
}

export interface IThing {
    name: string;
    id?: string;
    description?: string;
}

export interface IScene {
    "name": string;
    id?: string;
    description?: string;
    "dtg"?: string;
    "setting"?: string;
    "location"?: ILocation;
    "plotpoints"?: string; //how the plot intersects with the scene
    "events"?: Array<IEvent>;
    "people"?: Array<IPerson>;
    "plot"?: IPlot
    "things"?: Array<IThing>;
}


export interface IStory {
    title: string;
    id?: string;
    author?: string;
    genre?: string;
    maguffin?: string;
    summary?: string;
    plots?: IPlot[];
    scenes?: IScene[];
    people?: IPerson[];
    events?: IEvent[];
    locations?: ILocation[];
    things?: IThing[];
}


export const newStory: IStory = {
    title: "New story",
    id: "0",
    author: "New Author",
    genre: "Fiction",
    maguffin: "A gripping tale",
    summary: "A synopsis of the idea"
}

export const defaultStory: IStory =

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
        "plots": [
            {
                "description": "An investigation into a specious air disaster creates more questions than it answers as the evidence pushes  progressively more inexplicable root causes.",
                "id": "asdn",
                "name": "main",
                "parentId": "0",
                "type": "story",
                "subplots": [
                    {
                        "description": "Felcia's boss puts her in charge of the investigaton knowing she is unhinged.",
                        "id": "djri",
                        "name": "Act 1",
                        "parentId": "asdn",
                        "type": "story",
                        "subplots": [
                            {
                                "description": "Establish Felicia is crazy/PTSD coming off her last job.",
                                "id": "5647",
                                "name": "PROT development",
                                "parentId": "djri",
                                "type": "arc",
                                "subplots": []
                            }
                        ]
                    }]
            },
            {
                "description": "PROT comes to terms with her core beliefs about her faith and what is real.",
                "id": "1234",
                "name": "PROT development",
                "parentId": "0",
                "type": "arc",
                "subplots": []
            },
        ],
        "scenes": [
            {
                "name": "Grip and Grin",
                "dtg": "12 May 2017:1200",
                "plotpoints": "Felicia's inappropriate wardrobe and decorum show her disconnct with civil society.",
                "setting": "Felicia arrives while Grambone is briefing the staff in the conference room.",
                "id": "0926",
                "events": [],
                "location":  {
                    "description": "An unremarkable two story warehouse with basement in the SE side of Nashville's industrial district.",
                    "id": "3472",
                    "name": "Nashville Bi-Weekly"
                },
                "people": [{
                    "description": "Main character, journalist by trade.",
                    "id": "1029",
                    "name": "Felicia Martin",
                    "type": "PROT"
                }],
                "plot":
                    {
                    "description": "Establish Felicia is crazy/PTSD coming off her last job.",
                    "id": "5647",
                    "name": "PROT development",
                    "parentId": "djri",
                    "type": "arc",
                    "subplots": []
                },
                "things": []
            }
        ],
        "things": [
            {
                "description": "Felicia's Beretta 21A. A 22 cal pistol she is rarely without .",
                "id": "9384",
                "name": "Buddy"
            }
        ],
        "genre": "mystery",
        "maguffin": "A commercial airliner explodes as it prepares for its descent into Nashville",
        "id": "124567890",
        "summary": "After narrowly escaping her own murder ending her last undercover reporting job,  FM starts a traditional journalist's job the day of an air disaster. Her recent past and her failing sanity immediatly surface as she investigates the airliner's demise.",
        "title": "Sample Story"
    };
