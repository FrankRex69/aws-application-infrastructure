import Joi from "joi";

const schema = Joi.object().keys({
  otherInput: {
    NewImage: Joi.object().keys({
      applicationId: Joi.object().keys({
        N: Joi.number()
      }).required(),
      channelId: Joi.object().keys({
        S: Joi.string()
      }).required(),
      pollId: Joi.object().keys({
        N: Joi.number()
      }).required(),
      pollStatus: Joi.object().keys({
        S: Joi.string()
      }).required()
    }).required(),
    token: Joi.string()
  }
});
  
  
export const validateEvent = (event: any): any => {  
  const { error } = schema.validate(event, {allowUnknown: true});
  if (error && error.details) {      
    throw new Error('Error validateEvent');
  }
  return {      
    "applicationId": Number(event.otherInput.NewImage.applicationId.N),
    "channelId": event.otherInput.NewImage.channelId.S,
    "pollId": Number(event.otherInput.NewImage.pollId.N),
    "taskToken": event?.token,
    "pollStatus": event.otherInput.NewImage.pollStatus.S
  }
}