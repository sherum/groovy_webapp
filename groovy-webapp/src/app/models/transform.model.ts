import {IEvent, ILocation, IPerson, IPlot, IScene, IThing} from "./story.model";


export interface IPlotView {
    name: string;
    topPlot: boolean;
    storyId?: string;
    id?: string;
    parentId?: string;
    type?: string;
    description?: string;
    subplots?: Array<IPlotView>;
}

export class PlotView implements IPlotView {
    topPlot = false;
    description:string|undefined;
    id:string|undefined;
    name = "New Plot";
    parentId:string|undefined;
    storyId:string|undefined;
    type:string|undefined;
    subplots:IPlotView[]|undefined = new Array<IPlotView>();

    constructor(pid?: IPlotView) {
        if (pid) {
            this.name = pid.name;
            this.id = pid?.id;
            this.parentId = pid?.parentId;
            this.storyId = pid?.storyId;
            this.type = pid?.type;
            this.description = pid?.description;
            this.subplots =  pid?.subplots
        }
    }


    promoteTopPlot() {
        this.topPlot = true;
        this.parentId = this.id;
        this.storyId = "";
    }
}





export const daos: IPlotView[] = [
    {
        "topPlot": true,
        "name": "Main Plot",
        "id": "A",
        "parentId": "A",
        "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
        "type": "Mystery",
        "description": "A journalist suffering from PTSD and professional assassins must survive long enough to investigate an airline disaster and the conspiracy around it.",
        "subplots": [
            {
                "topPlot": false,
                "name": "Act I",
                "id": "B",
                "parentId": "A",
                "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                "type": "Setup",
                "description": "Capture the mind of a crazy person unable to see her insanity in real time. " +
                    "Cite details that will support evidence of her conditioning later. She's paranoid and they are out to get her.",
                "subplots": [
                    {
                        "topPlot": false,
                        "name": "Sabotage/Conspiracy",
                        "id": "B1",
                        "parentId": "B",
                        "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                        "type": "subplot",
                        "description": "All the evidence at Crash site 2 that doesn't add up.",
                        "subplots": [
                            {
                                "topPlot": false,
                                "name": "Erin the Ally",
                                "id": "B1A",
                                "parentId": "B1",
                                "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                                "type": "Character",
                                "subplots": [],
                                "description": "Creating a peer resource willing to help and draw out gaps in her investigation. Add sexual tension."
                            }
                        ],
                    },
                    {
                        "topPlot": false,
                        "name": "Felicia is crazy",
                        "id": "B2",
                        "parentId": "B",
                        "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                        "type": "Arc",
                        "subplots": [],
                        "description": "Show how deadly Felicia's mental decline is and set up to contrast with her miraculous recovery."
                    }
                ],
            },

            {
                "topPlot": false,
                "name": "Act II",
                "id": "C",
                "parentId": "A",
                "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                "type": "Confrontation",
                "description": "Felicia is cured of her mental decline, with a new flavor of insanity: Magic",
                "subplots": [
                    {
                        "topPlot": false,
                        "name": "Cult Witness",
                        "id": "C1",
                        "parentId": "C",
                        "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                        "type": "Arc",
                        "description": "Felicia is confronted by a witness claiming divine intervention which doesn't believe ",
                        "subplots": [],
                    },
                    {
                        "topPlot": false,
                        "name": "Pagan Cure",
                        "id": "C2",
                        "parentId": "C",
                        "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                        "type": "subplot",
                        "description": "Felicia's insanity is transformed overnight by divine intervention albeit pagan flavored.",
                        "subplots": [
                            {
                                "topPlot": false,
                                "name": "Real evidence",
                                "id": "C1A",
                                "parentId": "C2",
                                "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                                "type": "continuity",
                                "description": "Felicia's cure is steeped in pagan mysticism. All evidence of an impressive, but a terrestrial cure is here.",
                                "subplots": [],
                            }
                        ],
                    }
                ],

            },

            {
                "topPlot": false,
                "name": "Act III",
                "id": "D",
                "parentId": "A",
                "storyId": "7279a565-8275-4753-897d-499fc4ddad06",
                "type": "Resolution",
                "description": "Felicia comes to terms with the evidence collected, shattering many of her foundational beliefs.",
                "subplots": [],
            }
        ],

    }

]






