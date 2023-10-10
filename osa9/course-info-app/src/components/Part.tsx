import { CoursePart } from "../types";

export interface PartProps {
    coursePart: CoursePart
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({coursePart}: PartProps) => {
    let variableContent;
    switch(coursePart.kind) {
          case 'basic':
            variableContent =  <><em>{coursePart.description}</em></>
            break;
          case 'group':
            variableContent = <>project exercises {coursePart.groupProjectCount} </>
            break;
        case 'background':
            variableContent = <><em>{coursePart.description}</em> <br></br> {coursePart.backgroundMaterial}</>
            break;  
        case 'special':
            variableContent = <><em>{coursePart.description}</em> <br></br> requirements: {coursePart.requirements.map((req) => <div key={req}>{req}</div>)} </>
            break;
        default:
            return assertNever(coursePart);
    }       
  
    return <p><b>{coursePart.name} ({coursePart.exerciseCount} exercises)</b> <br></br>{variableContent} </p>
  }
  
export default Part;