import { params } from "./interface";
import config from "config";
import { UpdateItemInput, DynamoDB } from "@aws-sdk/client-dynamodb"
const { marshall } = require("@aws-sdk/util-dynamodb");


const dynamoClient = new DynamoDB({});

export const updateTaskToken = async (param: params): Promise<void> => {
  try {    
    
    const {applicationId, channelId, pollId, taskToken, pollStatus} = param   
        
    let UpdateExpressionData: any;
    let ExpressionAttributeValuesData: any; 

    if(taskToken !== undefined){
                          
      if(pollStatus==="OPENED"){        
        const openedTimestamp: number = new Date().getTime()
        UpdateExpressionData = "set taskToken=:taskToken, pollStatus=:pollStatus, openedTimestamp=:openedTimestamp"
        ExpressionAttributeValuesData = {":taskToken": taskToken,":pollStatus": pollStatus, ":openedTimestamp": openedTimestamp}
        console.log('open: ' + ExpressionAttributeValuesData);        
      }
      if(pollStatus==="REQUESTCLOSED"){      
        const closedTimestamp: number = new Date().getTime()
        UpdateExpressionData = "set taskToken=:taskToken, pollStatus=:pollStatus, closedTimestamp=:closedTimestamp"
        ExpressionAttributeValuesData = {":taskToken": taskToken,":pollStatus": pollStatus, ":closedTimestamp": closedTimestamp}
      }
    }
    if(taskToken == undefined){     
      UpdateExpressionData = "set pollStatus= :pollStatus"
      ExpressionAttributeValuesData = {":pollStatus": pollStatus}
    }

    const TableName: string = String(config.get('tableName'))
    const pollIdChannelId = pollId + "#" + channelId
    const todoParams: UpdateItemInput = {
      TableName: TableName,
      Key: marshall({applicationId: applicationId, "pollId_channelId": pollIdChannelId}),
      UpdateExpression: UpdateExpressionData,
      ExpressionAttributeValues: marshall(ExpressionAttributeValuesData),
      ReturnValues: "ALL_NEW"
    }
    await dynamoClient.updateItem(todoParams)
  } catch (error) {   
    console.error(error)
  }
}
