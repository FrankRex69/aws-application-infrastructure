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
      describe('and NewImage not present', () => {
        it('should throw an error', () => {
          const event = {key: 'value'}
          expect(()=>validateEvent(event)).to.throw
        })
      });
      describe('and NewImage IS empty', () => {
        it('should throw an error', () => {
          const event = {
            NewImage: {}
          }
          expect(()=>validateEvent(event)).to.throw;
        })
      });
      describe('and NewImage IS present', () => {
        it('should return an object', () => {
          const event = {
            otherInput:{
              NewImage: {
                applicationId: {N: 123},
                channelId: {S: 'WEB'},
                pollId: {N: 456},
                pollStatus: {N: 'qwe'}
              },
              token: '09876sdfgh'
            },
            sendVotingEmail: true
          }
          expect(validateEvent(event)).to.be.a('object')
        })
      })
    })
  
  })

})