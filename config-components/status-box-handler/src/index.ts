import { AxiosResponse } from "axios";
import config from "config";
import { validateEvent } from "./input";
import { dataOpenedInput } from "./interfaces";
import { createXml, sendXml, sendXmlByEmail } from "./utils";

export const init = async(event: dataOpenedInput): Promise<AxiosResponse | void> => {
  try {
   
    const validatedEvent = validateEvent(event)    

    // Change variables, string --> boolean
    const DRY_XXXX = JSON.parse(config.get('DRY_RXXXX')) 
    
    if(DRY_XXXX === true){
      const xmlfile = createXml(validatedEvent)          
      if(validatedEvent.sendVotingEmail === true){              
        await sendXmlByEmail(xmlfile)       
      }
      else
      {         
        await sendXml(xmlfile)
      }
    }
    return Promise.resolve()
  } catch (error) {
      console.error(error)
      throw error
  }
  
}

