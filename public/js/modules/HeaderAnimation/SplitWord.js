class SplitWord {

    constructor() {
        this.container = document.querySelector('.header-wrapper')
        this.splitHeader = []
        this.seperateLetters()
    }

    seperateLetters() {
        let header = document.querySelector('.header')
        this.splitHeader = header.textContent.split('')
    }

    startProcess() {
        let header = this.createHeader()
        for (let i = 0; i < this.splitHeader.length; i++) {
            let span = this.createSpan(i)
            header.appendChild(span)
        }
        this.replaceHeader(header)
    }

    createHeader() {
        let header = document.createElement('h1')
        header.classList.add('header')
        return header
    }

    createSpan(i) {
        let span = document.createElement('span')
        span.classList.add('letter')
        span.appendChild(this.turnLetterToTextNode(i))
        return span
    }

    turnLetterToTextNode(index) {
        return document.createTextNode(this.splitHeader[index])
    }

    replaceHeader(header) {
        this.container.replaceChild(header, this.container.firstElementChild)
    }

}

export default SplitWord
