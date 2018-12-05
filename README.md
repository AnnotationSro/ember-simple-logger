ember-simple-logger
==============================================================================

Replacement for `Ember.Logger` that is deprecated in newer Ember versions. The only reason to use this addon is when you need a callback to be called when something is logged.

Installation
------------------------------------------------------------------------------

```
ember install ember-simple-logger
```


Usage
------------------------------------------------------------------------------

```
  simpleLogger: service('simple-logger'),

//............
  this.get('simpleLogger').info('some text to log');
  this.get('simpleLogger').info('you can log arguments as well', 1, 2, 3);
```

To register a callback:
```
  this.get('simpleLogger').registerCallback('info', (level, msg, args) => {
    alert(`logged - level: ${level}; msg: ${msg}, arguments: ${args}`)
  });
```

Supported log levels:
* trace → `this.get('simpleLogger').trace(...);`
* debug → `this.get('simpleLogger').debug(...);`
* info → `this.get('simpleLogger').info(...);`
* warn → `this.get('simpleLogger').warn(...);`
* error → `this.get('simpleLogger').error(...);`

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
