# Overlapt

Making DOM elements that overlap from one section to another is a **pain!** So I wrote some simple ~~jQuery~~  VANILLA JAVASCRIPT package to help alleviate that pain.

I'd obviously rather just use CSS but sometimes spacing needs to be content aware and that's why I'm leveraging javascript.

[See a demo on CodePen](https://codepen.io/chrisladams/pen/wvmowNz)

### Data Parameters:

----

- **data-overlap**: The amount of overlap you want, accepts % or px, defaults to %. Ie: 45% or 100px.
- **data-overlap-closest**: The root container element to break out of if not a direct child of that element.
- **data-overlap-breakpoints**: Responsive changes to the overlap in a delimited string of  `screensize:amount`  separated with a semicolon. 0 disables the overlap completely. ie:  `1024:50%;768:30%;500:100px:400:0`

#### Example DOM Layout

```
<main class="overlapper-container">
    <section />
    <section>
        <div data-overlap /> ← 🧙‍ Magic / basic
    </section> 
    <section />
    <section />
    <section>
      <div class="inner-wrapper">
        <div
          data-overlap="40%"
          data-overlap-closest="section"
          data-overlap-breakpoints="768:35%;600:100px;400:0"
        /> ← 🧙‍ Magic with options
      </div>
    </section>
    <section />
    <section />
</main>
```

#### Instantiate:

VanillaJS

```
Array.from(document.querySelectorAll('div[data-overlap]')).forEach(function (el) {
  new Overlapt(el)
})
```

jQuery

```
$('div[data-overlap]').each(function () {
  new Overlapt($(this).get(0))
})
```