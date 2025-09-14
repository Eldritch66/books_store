const arr = ["hello", "world", "this", "is", "a", "test"];

console.log(arr.reduce((a, b) => `accumulated: ${a}` + `current: ${b}`, 0));
