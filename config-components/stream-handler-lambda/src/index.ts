import { Context, DynamoDBStreamEvent } from "aws-lambda";
import { startStep, stopStep } from "./utils"
import { validateEvent } from './input';

export const init = async (event: DynamoDBStreamEvent): Promise<void> => {  
  
  try {    

    const validatevent = validateEvent(event)
    
    if(validatevent.Records[0].eventName !== 'MODIFY') {
      throw new Error('Error eventName NOT MODIFY');
    }
          
    for (const record of validatevent.Records) {       

      const pollStatus: string = record.dynamodb?.NewImage?.pollStatus?.S!;
      const taskToken: string = record.dynamodb?.NewImage?.taskToken?.S;        

      switch (pollStatus) {
        case "XXXX":
          // Check taskToken to avoid loop stepfunction
          if(taskToken !== undefined) {
            console.debug("No need to start a new step function")
            return Promise.resolve();
          }
          console.debug('Invoking new step function')
          await startStep(record.dynamodb.NewImage)                  
          break;
        case "YYYY":
          if(taskToken === undefined) {
            throw new Error('Error taskToken undefined');
          }           
          console.debug('Resuming an existing step function')
          await stopStep(taskToken!)                 
          break;
        default:
          console.debug("Poll status NOT XXXX/YYYY");
      }
    }
  } catch (error) {
    console.error(error)
    throw error;
  }
}
