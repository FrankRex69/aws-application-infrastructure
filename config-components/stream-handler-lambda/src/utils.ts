import AWS from "aws-sdk";
import config from "config";

const stepfunctions = new AWS.StepFunctions()

export const startStep = (NewImage: object): Promise<any> => {
  try {
    console.debug("Vote opened, need to start a new step function")
    const StartExecutionParameter = { NewImage }
    const params: AWS.StepFunctions.Types.StartExecutionInput = {
      stateMachineArn: String(config.get('stateMachineArn')),
      input: JSON.stringify(StartExecutionParameter)
    };
    return stepfunctions.startExecution(params).promise();
  } catch (error) {
    throw new Error('Error Start Step Function');
  } 
}

export const stopStep = (taskToken: string): Promise<any> => {
  try {
    console.debug("Vote closed, need to stop step function")
    const params: AWS.StepFunctions.Types.SendTaskSuccessInput = {
      output: "{}",
      taskToken: taskToken
    }
  return stepfunctions.sendTaskSuccess(params).promise();
  } catch (error) {
    throw new Error('Error Stop Step Function');
  }  
}