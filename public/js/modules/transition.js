class transition {

    constructor() {
        this.header = document.querySelector('.header-wrapper')
        this.portfolio = document.querySelector('.portfolio-wrapper')
        this.navLinkPortfolio = document.querySelectorAll('.portfolio-link')
    }

    initialize() {
        this.navLinkPortfolio[0].addEventListener('click', this.move.bind(this))
        this.navLinkPortfolio[1].addEventListener('click', this.move.bind(this))
    }

    move() {
        this.header.classList.toggle('slide-left')
        this.portfolio.classList.toggle('negative-slide-left')
    }

}

export default transition
