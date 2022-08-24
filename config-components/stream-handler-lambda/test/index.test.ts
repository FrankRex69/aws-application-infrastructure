import 'mocha'
import * as chai from 'chai'
import * as input from '../src/input';
import * as sinon from 'sinon'

import { init } from '../src/index'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

import { util } from 'chai';

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect

describe("DYNAMO STREAM HANDLER TESTS", () => {
  describe("When validatEvent create throw", () => {
    before(() => {
      sinon.stub(input, 'validateEvent').throws()
    })

    after(() => {
      sinon.reset()
      sinon.restore()
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    it('should throw an Error', () => {
      return expect(init({} as any)).to.eventually.be.rejected;
    })
  })

  describe("When validatEvent create object", () => {
    describe("and eventName IS NOT modify", () => {
      before(() => {        
        sinon.stub(input, 'validateEvent').returns({
          Records: [{
            eventName: "INSERT"
          }]     
        })
      })
      after(() => {
        sinon.reset()
        sinon.restore()
      })  
      it('should throw an Error', () => {
        return expect(init({} as any)).to.eventually.be.rejected;
      })
    })

    describe("and eventName IS MODIFY", () => {            
      describe("and pollstatus IS NOT REQUESTOPENED or REQUESTCLOSED", () => {    
        before(() => {        
          sinon.stub(input, 'validateEvent').returns({
            Records: [{
              dynamodb: {
                NewImage: {
                  pollStatus: {
                    S: ""
                  }
                }
              },
              eventName: "MODIFY"
            }]     
          });
        });
        
        after(() => {
          sinon.reset()
          sinon.restore()
        })  
        
        it('should throw an Error', () => {
          return expect(init({} as any)).to.be.fulfilled
        })
      })
      
      describe("and pollstatus IS REQUESTOPENED or REQUESTCLOSED", () => {    
        before(() => {        
          sinon.stub(input, 'validateEvent').returns({
            Records: [{
              dynamodb: {
                NewImage: {
                  pollStatus: {
                    S: "REQUESTOPENED"
                  }
                }
              },
              eventName: "MODIFY"
            }]     
          });
        });
        
        after(() => {
          sinon.reset()
          sinon.restore()
        })  
        
        it('should throw an Error (because startStep do not has reals values', () => {
          return expect(init({} as any)).to.eventually.be.rejected;
        })
      }) 
    
    })
    
  })

})