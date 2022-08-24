import { validateEvent } from "./input";
import { UpdateStateVoteDb } from "./interface";
import { updateTaskToken } from "./utils";

export const init = async(event: UpdateStateVoteDb): Promise<void> => {  
  try {
    const validatEvent:any = await validateEvent(event)       
    await updateTaskToken(validatEvent)
  } catch (error: unknown) {    
    console.error(error)
    throw error; 
  }  
}