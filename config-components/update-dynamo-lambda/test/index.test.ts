import 'mocha'

import * as chai from 'chai'
import * as sinon from 'sinon'

import * as api_input from '../src/input'

import { init } from '../src/index'

import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect

describe('UPDATE PHASE TASKTOKEN HANDLER TESTS', () => {
  describe('When validateEvent is throw', () => {
    before(() => {      
      sinon.stub(api_input, 'validateEvent').throws()
    })

    after(() => {
      sinon.reset()
      sinon.restore()
    })

    it("should throw an Error", () => {
      return expect(init({} as any)).to.eventually.rejectedWith
    })   
  })

  describe('When validateEvent create at object', () => {    
    before(() => {
      sinon.stub(api_input, 'validateEvent').returns('object')   
    })
  
    after(() => {
      sinon.reset()
      sinon.restore()
    })
  
    it("should resolve a promise", () => {
      return expect(init({} as any)).to.be.fulfilled
    })
  })
})