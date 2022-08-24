import 'mocha'

import * as chai from 'chai'
import * as sinon from 'sinon'

import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

import axios from 'axios'
import path from 'path'
import { getPollStatus, sendXml } from '../src/utils'
import AWS, { SES } from "aws-sdk";
let ses = new AWS.SES({ region: "eu-west-1" });

import {mockClient} from 'aws-sdk-client-mock';

import * as api_input from '../src/utils'

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect

describe('-) getPollStatus TESTS', () => {
  
  describe('When event in input is empty', () => {    
    it('should be a throw', () => {
      const event = ""
      expect(()=>getPollStatus(event)).to.throw;
    })
  })

  describe('When event in input is ok', () => {
    let utils: any
    before(() => {
      delete require.cache[require.resolve('../src/utils.ts')]
      delete require.cache[require.resolve('config')]
      process.env.CAMEL_ENDPOINT = "camel_endpoint_dev"
      process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/")
      utils = require('../src/utils.ts')
    })
    after(() => {
      process.env.CAMEL_ENDPOINT = undefined
      sinon.restore()
    })
    it('should return a string', () => {
      const event = {
        otherInput: {
          NewImage: {
            pollStatus: {S: "REQUESTOPENED"}                              
          }
        }
      }
      expect(getPollStatus(event)).to.be.a('string')
    })
  })

})

describe('-) sendXml by application TESTS', () => {

  describe('When axios rejects', () => {
    let utils: any
    before(() => {
      delete require.cache[require.resolve('../src/utils.ts')]
      delete require.cache[require.resolve('config')]
      process.env.CAMEL_ENDPOINT = "http://10.39.223.130:8088/wireTap/XFacto"
      sinon.stub(axios, 'post').rejects()
      process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/")
      utils = require('../src/utils.ts')
    })
    after(() => {
      process.env.CAMEL_ENDPOINT = undefined
      sinon.restore()
    })
    it("should be rejected", () => {
      return expect(sendXml({} as any)).to.eventually.be.rejected
    })
  })

})

describe('-) sendXml by email TESTS', () => {
  
  describe('When EMAIL_SOURCE_VOTINGXML is undefined', () => {
    let utils: any
    before(() => {
      delete require.cache[require.resolve('../src/utils.ts')]
      delete require.cache[require.resolve('config')]
      process.env.EMAIL_SOURCE_VOTINGXML = undefined    
      process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/")
      utils = require('../src/utils.ts')
    })
    after(() => {
      process.env.EMAIL_SOURCE_VOTINGXML = undefined
      sinon.restore()
    })
    it("should be rejected", () => {
      return expect(utils.sendXmlByEmail({} as any)).to.eventually.be.rejected
    })  
  })
  describe('When EMAIL_SOURCE_VOTINGXML exists', () => {
    
    describe('When EMAIL_DESTINATION_VOTINGXML is undefined', () => {
      let utils: any
      before(() => {
        delete require.cache[require.resolve('../src/utils.ts')]
        delete require.cache[require.resolve('config')]
        process.env.EMAIL_SOURCE_VOTINGXML = "xxx@yyy.com"
        process.env.EMAIL_DESTINATION_VOTINGXML = undefined
        process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/")
        utils = require('../src/utils.ts')
      })
      after(() => {
        process.env.EMAIL_SOURCE_VOTINGXML = undefined
        process.env.EMAIL_DESTINATION_VOTINGXML = undefined
        sinon.restore()
      })
      it("should rejected", () => {
        return expect(utils.sendXmlByEmail({} as any)).to.eventually.be.rejected
      })  
    })

    describe('When EMAIL_DESTINATION_VOTINGXML exists', () => {
      let utils: any
      before(() => {
        delete require.cache[require.resolve('../src/utils.ts')]
        delete require.cache[require.resolve('config')]
        process.env.EMAIL_SOURCE_VOTINGXML = "francesco.re69@gmail.com"
        process.env.EMAIL_DESTINATION_VOTINGXML = "francesco.re.nttdata@skytv.it"
        process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../src/config/")
        utils = require('../src/utils.ts')
      })
      after(() => {
        process.env.EMAIL_SOURCE_VOTINGXML = undefined
        process.env.EMAIL_DESTINATION_VOTINGXML = undefined
        sinon.restore()
      })      
      it("should resolve", () => {
        return expect(utils.sendXmlByEmail("xmlFile")).to.eventually.be.fulfilled
      })
    })

  })
  
})