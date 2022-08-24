import { create } from 'xmlbuilder2';
import axios, { AxiosResponse } from "axios";
import config from 'config';

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: "eu-west-1" });

export const getPollStatus = (validateEvent: any): any => {

  try {
    let partEventStatus
    switch (validateEvent.otherInput.NewImage.pollStatus.S) {
      case "XXXX":
        partEventStatus = "on"
        break;
      case "YYYY":
        partEventStatus = "off"
        break;
      default:
        throw new Error("No XXXX/YYYY received")
    }
    return partEventStatus
  } catch (error) {
    console.error(error)
    throw error    
  }
}

export const createXml = (validateEvent: any): string => {
  
  try {
    // -- Handler data for voting.xml
   
    // delete for privacy
    
    //create different PartecipantsEventId opened/closed

    // delete for privacy
    
    const xmlFile = "xml test"

    return xmlFile
  
  } catch (error) {
      console.error(error)
      throw error
  }
}

const configuration = {headers: {'Content-Type': 'text/xml'}}

export const sendXml = async(xmlfile: string): Promise<AxiosResponse> => {
  const URL = String(config.get('URL'))  
  const responseSendXml = await axios.post(URL, xmlfile, configuration)
  return responseSendXml  
}

export const GGGEmail = async(xmlfile: string): Promise<any> => {
  const EMAIL_GGGG = String(config.get('EMAIL_GGG'))
  const EMAIL_KKKK = String(config.get('EMAIL_GGGG'))
  const params = {
    Destination: {ToAddresses: [EMAIL_GGGG]},
    Message: { 
      Body: {Text: { Data: xmlfile }, },        
      Subject: { Data: "voting.xml" },
    },
    Source: EMAIL_KKKK,
  }
  const data = await sesClient.send(new SendEmailCommand(params))  
  return data
}