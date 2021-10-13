# Introduction

<br />

Its a amazing react carousel package base on<strong style="color: gold;font-size: 14px; font-weight: 900"> CSS </strong> to root and items.

- support ltr and rtl languages.
- you can set @media css to carousel for responsive container and items.
- support four direction (left, right, top, bottom)
- its compute package root and items size after render
- it has a automatic computing when device or window size is change.

<br />

<strong style='color: red'>online document is not complete yet, but package works!</strong>

<br />

## Package size:

<br />
package size: <span style='padding-left:20px'> 8 kb</span>
<div style='margin:10px'></div>
zipped size: <span style='padding-left:30px'>3 kb</span>

<br />
<br />
<br />
<br />

## Package link:

[github link](https://github.com/mohammadbrzbrz72/react-automatic-carousel)
<br />
[npm link](https://www.npmjs.com/package/react-automatic-carousel)

<br />
<br />
<br />
<br />

## Installation

<br />

**npm**: <br />
`npm i react-automatic-carousel`

**yarn**: <br />
`yarn add react-automatic-carousel`

<br /><br />

## Description

AutomaticCarousel package works with **root** with and **items** size. <br />
You have to set **width** and **height** from the <strong style="color: green;font-size: 16px; font-weight: 900">root</strong> element and <strong style="color: green;font-size: 16px; font-weight: 900">items</strong> elements.
<br/> Dont worry about carousel function on different device or window resizes, it works fine. <br /><br />
<strong style='color: red'>Be sure to read css code to make package works !</strong>

<br /><br />

## Exmaple

<br />

**Simple usage**:

```jsx
import { AutomaticCarousel } from "react-automatic-carouse";

<AutomaticCarousel className="carousel-x">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
</AutomaticCarousel>;
```

#### css code ltr and rtl:

```
// root element
.carousel-x {
  width: 600px;
  height: 200px;
  padding: 10px 0px;
}

// set custom space between items by items wrapper
.carousel-x .automatic-carousel-wrapper {
  gap: 20px;
}

// set styles to your items
.automatic-carousel-wrapper > div {
  width: 250px;
  height: 100%;
  background: black;
  color: white;
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .carousel-x {
    width: 400px;
    height: 150px;
  }
  .carousel-x .automatic-carousel-wrapper {
    // set custom space between items
    gap: 12px;
  }
}

@media screen and (max-width: 450px) {
  .carousel-x {
    width: 300px;
  }
}
```

<br /><br /><br />

**With package Buttom**

```jsx
import { AutomaticCarousel } from "react-automatic-carouse";

function Example() {
  return (
    <>
      <AutomaticCarousel
        dir="left"
        defaultItem={5}
        className="carousel-x"
        Button={Button}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
      </AutomaticCarousel>
    </>
  );
}

function Button({ prev, next }) {
  return (
    <div className={classes.buttons_h}>
      <button onClick={() => prev()}>prev</button>
      <button onClick={() => next()}>next</button>
    </div>
  );
}
```

<br />

**With Custom buttom or dots or any**

```jsx
import { AutomaticCarousel, useRefStore } from "react-automatic-carouse";

function Example() {
  const [moveTo, setMoveTo] = useRefStore();

  return (
    <>
      <AutomaticCarousel
        dir="left"
        defaultItem={3}
        className="carousel-x"
        moveTo={setMoveTo}
        movesInfo={({ activeIndex, disableButton }) => {
          console.log("data:", activeIndex, disableButton);
        }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
      </AutomaticCarousel>

      <ButtonOrDotOrAny moveTo={moveTo} />
    </>
  );
}

// create your custom ui with *moveTo*
function ButtonOrDotOrAny({ moveTo }) {
  return (
    <>
      <button
        onClick={() => {
          moveTo.current(-2);
        }}
      >
        prev, two step
      </button>
      <button
        onClick={() => {
          moveTo.current(3);
        }}
      >
        next three step
      </button>
    </>
  );
}
```

<br />

**Rtl languages (persian, arabic, ...)**:

```jsx
<AutomaticCarousel dir="right" className="carousel-x">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</AutomaticCarousel>
```

<br />

```jsx
<AutomaticCarousel
  dir="top" // or bottom
  className="carousel-y"
>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</AutomaticCarousel>
```

#### css code ttb and btt:

```
// root element
.carousel-y {
  width: 200px;
  height: 800px;
  padding: 0px 10px;
}

// set custom space between items by items wrapper
.carousel-y .automatic-carousel-wrapper {
  gap: 20px;
}

// set styles to your items
.automatic-carousel-wrapper > div {
  width: 100% ;
  height: 300px;
  background: black;
  color: white;
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .carousel-y {
    width: 150px;
    height: 650px;
  }
  .carousel-y .automatic-carousel-wrapper {
    // set custom space between items
    gap: 12px;
  }
}

@media screen and (max-width: 450px) {
  .carousel-y {
    height: 500px;
  }
}
```

<br /><br /><br />

### Props and default props values:

<br />

```
AutomaticCarousel.propTypes = {
  /**
   * root class name
   * default: ''
   */
  className: Proptypes.string,

  /**
   * remove text markup
   * default: true
   */
  offUserSelect: Proptypes.bool,

  /**
   * speed of user touch or mouse movment
   * default: { touch: 2, mouse: 3 }
   */
  speeds: Proptypes.object,

  /**
   * swipeable carousel or work with buttons
   * default: true
   */
  swipeable: Proptypes.bool,

  /**
   * specify your carousel direction:
   * {
   *   'left',  // ltr (english, )
   *   'right', // rtl (Persian/Farsi, Arabic, Kurdish, Azeri, ...)
   *   'top',
   *   'bottom',
   * }
   * default: 'left'
   */
  dir: Proptypes.oneOf('left', 'right', 'top', 'bottom'),

  /**
   * move transition by millisecond
   * default: 200
   */
  transition: Proptypes.number,

  /**
   * carousel move direction by user swipeable
   * defaut: 'reverse'  // reverse | forward
   */
  moveDirection: Proptypes.oneOf(['reverse', 'forward']),

  /**
   * children wrap with this package
   */
  children: Proptypes.node,

  /**
   * get active index and buttons mode
   * activeIndex disableButton
   * send ref as props in movesInfo property
   */
  movesInfo: Proptypes.object,

  /**
   * set default item by index
   */
  defaultIndex: Proptypes.number,

  /**
   * change active item by custom buttons or dots , ...
   */
  moveTo: Proptypes.func,

  /**
   * you can use carousel Button with set element name like 'div' or 'button', ...
   */
  Button = Fragment,

}
```
