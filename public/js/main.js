import test from './modules/first'
import Transition from './modules/Transition'
import {Initializer} from './modules/GenerateSquare'

const transTest = new Transition()
transTest.initialize()

fetch('http://localhost:5000/images')
    .then(response => response.clone())
    .then(cloned => cloned.json())
    .then(res => {
        const init = new Initializer(3, res.length, 'http://localhost:5000/images')
    })
