export default class Overlapt {
  constructor(el) {
    this.el = el
    this.update()
    window.addEventListener('resize', () => { this.update() })
    document.querySelector('img').addEventListener('load', () => { this.update() })
  }

  update () {
    if (!this.el) { return }
    var section = this.el.dataset.overlapClosest ?
      this.el.closest(this.el.dataset.overlapClosest) : this.el.parentNode
    var neighbor = section.nextElementSibling
    var amount = this.el.dataset.overlap ? this.el.dataset.overlap : '50'

    if (this.el.dataset.overlapBreakpoints) {
      try {
        var breakpoints = {}
        this.el.dataset.overlapBreakpoints
          .split(';')
          .forEach(function(values) {
            var tmp = values.split(':')
            breakpoints[tmp[0]] = tmp[1]
          })
        
        Object.keys(breakpoints)
          .reverse()
          .forEach(function(bp) {
            if (window.innerWidth < parseInt(bp)) {
              amount = breakpoints[bp]
            }
          })
      } catch (e) {
        console.error(e)
      }
    }

    var percentage = !amount.includes('px')
    var extraOffset = parseInt(window.getComputedStyle(section).paddingBottom)
    amount = parseInt(amount)
    if (percentage) {
      amount = this.el.clientHeight * (amount / 100)
    }

    // Set neighbor CSS spacing
    neighbor.style.paddingTop = ''
    this.el.style.marginBottom = ''
    var neighborTopPadding = parseInt(window.getComputedStyle(neighbor).paddingBottom)
    if (amount > 0) {
      neighbor.style.paddingTop = (neighborTopPadding + amount) + 'px'
      this.el.style.marginBottom = (-1 * (amount + extraOffset)) + 'px'
    }
  }
}
