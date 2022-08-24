import Joi from "joi"

const schema = Joi.object().keys({
    Records: Joi.array().items({
        dynamodb: Joi.object().keys({
            NewImage: Joi.object().keys({
                pollStatus:Joi.object().keys({
                    S: Joi.string()
                }).required(),
                pollId_channelId: Joi.object().keys({
                    S: Joi.string()
                }).required(),
                pollId: Joi.object().keys({
                    N: Joi.number()
                }).required(),
                applicationId:Joi.object().keys({
                    N: Joi.number() 
                }).required(),
                channelId: Joi.object().keys({
                    S: Joi.string()
                }).required(),
                participants: Joi.object().keys({
                    L: Joi.array().items({                             
                        M: Joi.object().keys({
                          participantId: Joi.object().keys({
                            N: Joi.number()
                          }),
                          pollOptionId: Joi.object().keys({
                            N: Joi.number()
                          })
                        })
                    })
                }),
                requestopenedTimestamp:Joi.object().keys({
                    N: Joi.number() 
                })              
            }),
        }).required(),
        eventName: Joi.string().required()
    }).min(1)
});

export const validateEvent = (event: unknown): any => {    
  const { error, value } = schema.validate(event, {allowUnknown: true});
  if (error && error.details) {
    console.error(error)    
    throw new Error('Error validateEvent');
  }
  return value;
}
