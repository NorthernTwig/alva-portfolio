class HeaderAnimator {

    constructor() {
        this.letters = document.querySelectorAll('.letter')
        this.nav = document.querySelector('.nav')
        this.index = 0
    }

    beginAnimation() {
        this.paus()
            .then(done => {
                if (this.letters[this.index] !== undefined) {
                    this.beginAnimation()
                } else {
                    this.displayNavigation()
                }
            })
    }

    paus() {
        return new Promise((resolve) => {
            this.addingClassToLetter()
            setTimeout(() => {
                resolve()
            }, 150)
        })
    }

    addingClassToLetter() {
        this.letters[this.index].classList.add('appear')
        this.index++
    }

    displayNavigation() {
        this.nav.classList.add('nav-display')
    }

}

export default HeaderAnimator
