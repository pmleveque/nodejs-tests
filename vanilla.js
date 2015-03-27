function upperCaser(input) {
  return input.toUpperCase()
}

module.exports = upperCaser

function repeat(operation, num) {
  if (num > 0 ) {
    operation()
    repeat(operation, num - 1)
  }
}

module.exports = repeat

// Array.prototype.map = function(operation) {
//   var result = []
//   for (i = 0; i < this.length; i++) {
//     result[i] = operation(this[i])
//   }

//   return result
// }

function doubleAll(numbers) {
  return numbers.map(function(value){
    return value * 2
  })
}

module.exports = doubleAll

function getShortMessages(messages) {
  return messages.filter(function (obj) {
    return obj.message.slice(0,50) == obj.message
  }).map(function(obj) {
    return obj.message
  })
}

module.exports = getShortMessages

function checkUsersValid(goodUsers) {
  return function(submittedUsers) {
    return submittedUsers.every(function(submittedUser) {
      return goodUsers.some(function(goodUser) {
        return goodUser.id === submittedUser.id
      })
    })
  }
}

module.exports = checkUsersValid

// @input Array.<string>
// @return Object.<string,number>
//
// var inputStrings = ["First", "Second", "First"]
//
// countStrings(inputStrings)
// => {"First" => 2, "Second" => 1}
//

function countWords(arr) {
  return arr.reduce(function(countMap, word) {
    countMap[word] = ++countMap[word] || 1
    return countMap
  }, {}) // second arguement initializes countMap to {}
}

module.exports = countWords

// function reduce(arr, fn, init, index) {
//   newindex = ++index || 1
//   var currentItem = arr[newindex - 1]
//   if (arr.length > newindex) {
//     return reduce(arr, fn, fn(init, currentItem, newindex, arr), newindex)
//   } else {
//     //console.log(init, currentItem, newindex, arr)
//     return fn(init, currentItem, newindex, arr)
//   }

// }

// module.exports = reduce


function reduce(arr, fn, init) {
  return (function recReduce(index, previous) {
    var current = fn(previous, arr[index], index, arr)
    if (index < arr.length - 1) {
      return recReduce(++index, current)
    } else {
      return current
    }
  })(0, init)
}

module.exports = reduce

// @returns number of arguments passed to it which have a property
// 'quack' defined directy on them
function duckCount() {
  // {O: 'argument0', 1: 'arg1', length:2}
  return Array.prototype.slice.call(arguments, 0).reduce(function(prev, next) {
    return (Object.prototype.hasOwnProperty.call(next, 'quack')) ? ++prev : prev
  }, 0)
}

// @example
// duckCount({quack: 5, quick: 2}, {}, {quack: 3}) => 2

module.exports = duckCount

// @example
// var logger = logWithNamespace("App:")
// logger("hey", Obj, ...) => "App:hey Obj ..."

function logger(namespace){
  return function() {
    console.log.apply(null, [].concat(namespace, Array.prototype.slice.call(arguments)))
  }
}


module.exports = logger