'use strict'

import Transition from './modules/Transition'
import AnimationInitializer from './modules/HeaderAnimation/AnimationInitializer'
import {
    Initializer
} from './modules/GenerateSquare'


const animationInitializer = new AnimationInitializer()
const transTest = new Transition()
transTest.initialize()

const init = new Initializer(4, 'http://localhost:5000/images')
