#Prototype
A prototype is another object that is used as a fallback source of properties. 
The great ancestral prototype is `Object.prototype`
<br>
You can use `Object.create()` to create an object with a specific prototype

```js
let protoCat = {
  speak(line) {
    console.log(`The ${this.type} cat says '${line}'`);
  }
};

let ninjaCat = Object.create(protoCat);

ninjaCat.type = "ninja";
ninjaCat.speak('FLEXxxxx');
```
`.__proto__` can be used similarly with `Object.create()`. But it's no longer recommended.
```js
let ninjaCat = {};
ninjaCat.__proto__ = protoCat;
```
