import test from './modules/first'
import Transition from './modules/Transition'
import {Initializer} from './modules/GenerateSquare'

const transTest = new Transition()
transTest.initialize()
const init = new Initializer(5, 2000, 'http://localhost:5000/images')
