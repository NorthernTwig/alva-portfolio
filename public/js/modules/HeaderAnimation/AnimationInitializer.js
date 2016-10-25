import HeaderAnimator from './HeaderAnimator'
import SplitWord from './SplitWord'

class AnimationInitializer {

    constructor() {
        const splitWord = new SplitWord()
        splitWord.startProcess()

        const headerAnimator = new HeaderAnimator()
        headerAnimator.beginAnimation()
    }

}

export default AnimationInitializer
