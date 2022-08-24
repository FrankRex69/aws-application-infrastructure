import Joi from "joi"
export class InternalServerException extends Error {}

const schema = Joi.object().keys({
  NewImage: Joi.object().keys({
    applicationId: Joi.object().keys({
      N: Joi.number
    }).required(),
    channelId: Joi.object().keys({
      S: Joi.string
    }).required(),
    pollId: Joi.object().keys({
      N: Joi.number
    }).required(),
    pollStatus: Joi.object().keys({
      S: Joi.string
    }).required(),
    participants: Joi.object().keys({
      L: Joi.array().items({                             
          M: Joi.object().keys({
            participantId: Joi.object().keys({
              N: Joi.number()
            }).required(),
            pollOptionId: Joi.object().keys({
              N: Joi.number()
            }).required()
          }).required(),
      }).required(),
    }).required(),
    pollOptionId: Joi.object().keys({
      N: Joi.number
    }).required(),
    openedTimestamp: Joi.object().keys({
      N: Joi.number
    }).required(),
    readyTimestamp: Joi.object().keys({
      N: Joi.number
    }).required()
  }),
  sendVotingEmail: Joi.bool()
});

export const validateEvent = (event: unknown): any => {    
  const { error, value } = schema.validate(event, {allowUnknown: true});
  if (error && error.details) {    
    throw new Error('Error validateDataOpened');
  }
  return value
}