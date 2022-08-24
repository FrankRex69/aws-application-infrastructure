import 'mocha'

import * as chai from 'chai'
import * as sinon from 'sinon'

import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

import * as api_input from '../src/utils'
import * as input from '../src/input'
import path from 'path'

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect


describe("STATUS VOTING HANDLER BOX TESTS", () => {

  describe("When validateevent throw", () => {
    let index: any 
    before(() => {
      delete require.cache[require.resolve('../src/index.ts')]
      delete require.cache[require.resolve('config')]
      process.env.DRY_RUN_INVOKE_CAMEL = "false"  
      sinon.stub(input, 'validateEvent').throws()
      process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/")
      index = require('../src/index.ts')      
    })

    after(() => {
      process.env.DRY_RUN_INVOKE_CAMEL = undefined
      sinon.restore()
    })

    it("should throw an Error", () => {      
      return expect(index.init({} as any)).to.eventually.be.rejected
    })
  })

  describe("When validateevent return a value", () => {

    describe("and DRY_RUN_INVOKE_CAMEL === false", () => {
      let index: any
      before(() => {
        delete require.cache[require.resolve('../src/index.ts')]
        delete require.cache[require.resolve('config')]
        process.env.DRY_RUN_INVOKE_CAMEL = "false"      
        sinon.stub(input, "validateEvent").resolves({} as any)
        process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/");
        index = require('../src/index.ts')         
      })

      after(() => {
        process.env.DRY_RUN_INVOKE_CAMEL = undefined
        sinon.restore()
      })

      it("should resolve", () => {          
        return expect(index.init({} as any)).to.eventually.be.fulfilled   
      })     
    })

    describe("and DRY_RUN_INVOKE_CAMEL === true", () => {
      
      describe("and createXml throws", () => {
        let index: any
        before(() => {
          delete require.cache[require.resolve('../src/index.ts')]
          delete require.cache[require.resolve('config')]
          process.env.DRY_RUN_INVOKE_CAMEL = "true"      
          sinon.stub(input, "validateEvent").resolves({} as any)
          sinon.stub(api_input, "createXml").throws()
          process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/");
          index = require('../src/index.ts')         
        })
  
        after(() => {
          process.env.DRY_RUN_INVOKE_CAMEL = undefined
          sinon.restore()
        })
  
        it("should throw an Error", () => {          
          return expect(index.init({} as any)).to.eventually.be.rejected   
        })     
      })

      describe("and createXml returns", () => {
        
        describe("and event.sendVotingEmail === false", () => {

          describe("and sendXml throw", () => {
            let index: any
            before(() => {
              delete require.cache[require.resolve('../src/index.ts')]
              delete require.cache[require.resolve('config')]
              process.env.DRY_RUN_INVOKE_CAMEL = "true"
              sinon.stub(input, "validateEvent").resolves({} as any)
              sinon.stub(api_input, "createXml").resolves({} as any)
              sinon.stub(api_input, "sendXml").rejects({} as any)
              process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/");
              index = require('../src/index.ts')         
            })
      
            after(() => {
              process.env.DRY_RUN_INVOKE_CAMEL = undefined
              process.env.CAMEL_ENDPOINT = undefined
              sinon.restore()
            })
      
            it("should throws", () => {           
              const event = {
                otherInput: {},
                sendVotingEmail: false 
              }
              return expect(index.init(event)).to.eventually.be.rejected
            })          
          })

          describe("and sendXml returns", () => {
            let index: any
            before(() => {
              delete require.cache[require.resolve('../src/index.ts')]
              delete require.cache[require.resolve('config')]
              process.env.DRY_RUN_INVOKE_CAMEL = "true"
              sinon.stub(input, "validateEvent").resolves({} as any)
              sinon.stub(api_input, "createXml").resolves({} as any)
              sinon.stub(api_input, "sendXml").resolves({} as any)
              process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/");
              index = require('../src/index.ts')         
            })
      
            after(() => {
              process.env.DRY_RUN_INVOKE_CAMEL = undefined
              process.env.CAMEL_ENDPOINT = undefined
              sinon.restore()
            })
      
            it("should send voting.xml by application", () => {           
              const event = {
                otherInput: {},
                sendVotingEmail: false 
              }
              return expect(index.init(event)).to.eventually.be.fulfilled
            })          
          })
          
        })
      
        describe("and event.sendVotingEmail === true", () => {

          describe("and sendXmlByEmail throw", () => {

            let index: any
            before(() => {
              delete require.cache[require.resolve('../src/index.ts')]
              delete require.cache[require.resolve('config')]
              process.env.DRY_RUN_INVOKE_CAMEL = "true"
              sinon.stub(input, "validateEvent").resolves({} as any)
              sinon.stub(api_input, "createXml").resolves({} as any)
              sinon.stub(api_input, "sendXmlByEmail").rejects({} as any)
              process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/");
              index = require('../src/index.ts')         
            })
      
            after(() => {
              process.env.DRY_RUN_INVOKE_CAMEL = undefined
              process.env.CAMEL_ENDPOINT = undefined
              sinon.restore()
            })
      
            it("should throw", () => {           
              const event = {
                otherInput: {},
                sendVotingEmail: true 
              }
              return expect(index.init(event)).to.eventually.be.rejected
            })
          
          })

          describe("and sendXmlByEmail returns", () => {

            let index: any
            before(() => {
              delete require.cache[require.resolve('../src/index.ts')]
              delete require.cache[require.resolve('config')]
              process.env.DRY_RUN_INVOKE_CAMEL = "true"
              sinon.stub(input, "validateEvent").resolves({} as any)
              sinon.stub(api_input, "createXml").resolves({} as any)
              sinon.stub(api_input, "sendXmlByEmail").resolves({} as any)
              process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/");
              index = require('../src/index.ts')         
            })
      
            after(() => {
              process.env.DRY_RUN_INVOKE_CAMEL = undefined
              process.env.CAMEL_ENDPOINT = undefined
              sinon.restore()
            })
      
            it("should throw", () => {           
              const event = {
                otherInput: {},
                sendVotingEmail: true 
              }
              return expect(index.init(event)).to.eventually.be.fulfilled
            })
          
          })
          
        })
      })

    })   

  })

})