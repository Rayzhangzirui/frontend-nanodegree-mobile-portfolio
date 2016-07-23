# Website Optimization

A project of Udacity's Front-End Web Developer Nanodegree. The task was to optimize a provided website with a number of optimization and performance-related issues so that it achieves a target PageSpeed score and runs at 60 frames per second.

## File Structure

###### assets/

Contains development CSS, JS and images, sorted into corresponding directories.

###### public/build

Contains the production ready html, CSS, JS and images.

## Build

The Gulp.js is used to streamline the build process, including minification of scripts, style sheets and html, optimization of images.

###### Install node modules with package.json

```
$ npm install 
```

###### build with gulpfile.js

```
$ gulp
```


## PageSpeed score

##### 1. CSS
 
Inline all of the CSS into the head of the index.html and added the HTML **media="print"** attribute to the link to print.css

##### 2. JS

Add the **Ascy** to all script tags and minify the javascript files.

##### 3.Images

Resizd images that were too large and compresse all images.

##### 4.HTML

Minify the html files

### Getting Rid of Jank

##### Reduce time to resize pizzas

In the original function ```changePizzaSlice``` , The handler computes each image container’s ```width``` property based on the container’s ```offsetWidth``` value. This forces the browser to perform a new layout immediately to make sure that it provides the correct value. Also, the function ```determineDx``` is redundant. We can directly set the width instead of fisrt caculating the change of the width. This part is modifed as follow

```js
  function changePizzaSizes(size) {
    var newWidth;
    switch(size){
      case "1":
        newWidth = 25;
        break;
      case "2":
        newWidth = 33.3;
        break;
      case "3":
        newWidth = 50;
        break;
      default:
        console.log("bug in sizeSwitcher")
    };
    var randomPizzas = document.querySelectorAll(".randomPizzaContainer");
    for (var i = 0; i< randomPizzas.length;i++){
      randomPizzas[i].style.wdith = newWidth + "%"
    };
  }
  ```

##### Optimize Frame rate

###### 1. stop forced synchronous layouts
In the original ```updatePositions``` function, accessing ```body.scrollTop``` and set ```style.left``` in a loop also leads to forced synchronous layout. Thus, in the modification below, we read style values before the loop.

```js
var top = document.body.scrollTop / 1250;
  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((top) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```
###### 2. use RequestAnimationFrame
Add the ```updatePositions``` function as a parameter to the ```window.requestAnimationFrame``` method in the scroll event listener.

```js
window.addEventListener('scroll', function() {
	window.requestAnimationFrame(updatePositions);
});
```





