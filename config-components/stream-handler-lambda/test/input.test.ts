import 'mocha'
import { expect } from 'chai';
import { validateEvent } from '../src/input'

describe('VALIDATE EVENT TESTS', () => {
  describe('when event in input is NOT valide', () => {
      
    describe('when event in input is empty', () => {
      it('should throw an error', () => {
        const event = {}
        expect(()=>validateEvent(event)).to.throw;     
      })    
    });

    describe('when event in input is NOT empty', () => {
      describe('and Records not present', () => {
        it('should throw an error', () => {
          const event = {key: 'value'}
          expect(()=>validateEvent(event)).to.throw;     
        })
      });

      describe('and Records IS empty', () => {
        it('should throw an error', () => {
          const event = {
            Records: [{}]
          }
          expect(()=>validateEvent(event)).to.throw;     
        })
      });

      describe('and Records IS present', () => {        
        describe('and dynamodb is NOT present', () => {
          it('should throw an error', () => {
            const event = {
              Records: [{
                key: 'value'
              }]
            }
            expect(()=>validateEvent(event)).to.throw; 
          })
        });
        
        describe('and dynamodb is present but is empty', () => {
          it('should throw an error', () => {
            const event = {
              Records: [{
                dynamodb: {}
              }]
            }
            expect(()=>validateEvent(event)).to.throw; 
          })
        });
        
        describe('and dynamodb is present but is NOT empty', () => {
          describe('and NewImage is NOT present', () => {
            it('should throw an error', () => {
              const event = {
                Records: [{
                  dynamodb: { key: 'value'}
                }]
              }
              expect(()=>validateEvent(event)).to.throw;
            })  
          })
       
          describe('and NewImage is present but empty', () => {
            it('should throw an error', () => {
              const event = {
                Records: [{
                  dynamodb: { 
                    NewImage: {}
                  }
                }]
              }
              expect(()=>validateEvent(event)).to.throw;
            })  
          })

          describe('and NewImage is present and NOT empty', () => {
            it('should throw an error', () => {
              const event = {
                Records: [{
                  dynamodb: { 
                    NewImage: {key: 'value'}
                  }
                }]
              }
              expect(()=>validateEvent(event)).to.throw;
            })  
          })

        })


      });        
    
    });    
  });

  describe('when event in input IS valide', () => {
    describe('and Records IS present', () => {
      describe('and NewImage IS present but is NOT empty', () => {
        describe('and NewImage IS present and there are all fields required', () => {
          it('should return an object', () => {
            const event = {
              Records: [{
                dynamodb: {
                  NewImage: {
                    pollStatus: {S: 'OPENED'},
                    pollId_channelId: {S: '19#WEB'},
                    pollId: {N: 18},
                    applicationId: {N: 566},
                    channelId: {S:'WEB'},
                    participants: {L: [
                        {
                          M:{
                            participantId: {N: 11},
                            pollOptionId: {N: 22}
                          }
                        }
                      ]
                    },
                    openedTimestamp: {N:'1678889999'}
                  }
                },
                eventName: 'MODIFY'
              }]              
            }
            expect(validateEvent(event)).to.be.a('object')            
          })
        })
      })
    })
  });
})