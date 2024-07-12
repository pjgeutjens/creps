export const tests = [
    {
        content: "function capitalize(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}",
        description: "Capitalize the first letter of a string.",
        language: "javascript",
    },
    {
        content: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
        description: "Reverse a string.",
        language: "javascript",
    },
    {
        content: "function findMax(arr) {\n  return Math.max(...arr);\n}",
        description: "Find the maximum number in an array.",
        language: "javascript",
    },
    {
        content: "function findMin(arr) {\n  return Math.min(...arr);\n}",
        description: "Find the minimum number in an array.",
        language: "javascript",
    },
    {
        content: "function sumArray(arr) {\n  return arr.reduce((acc, val) => acc + val, 0);\n}",
        description: "Sum all numbers in an array.",
        language: "javascript",
    },
    {
        content: "function isPalindrome(str) {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}",
        description: "Check if a string is a palindrome.",
        language: "javascript",
    },
    {
        content: "function arrayAverage(arr) {\n  const sum = arr.reduce((acc, val) => acc + val, 0);\n  return sum / arr.length;\n}",
        description: "Calculate the average of an array.",
        language: "javascript",
    },
    {
        content: "function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}",
        description: "Remove duplicates from an array.",
        language: "javascript",
    },
    {
        content: "function fibonacci(n) {\n  let [a, b] = [0, 1];\n  while (n-- > 0) [a, b] = [b, a + b];\n  return a;\n}",
        description: "Generate the nth Fibonacci number.",
        language: "javascript",
    },
    {
        content: "function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
        description: "Calculate the factorial of a number.",
        language: "javascript",
    },
    {
        content: "function countWords(str) {\n  return str.split(' ').filter(Boolean).length;\n}",
        description: "Count the number of words in a string.",
        language: "javascript",
    },
    {
        content: "function mergeArrays(arr1, arr2) {\n  return [...arr1, ...arr2];\n}",
        description: "Merge two arrays.",
        language: "javascript",
    },
    {
        content: "function toCamelCase(str) {\n  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());\n}",
        description: "Convert a string to camel case.",
        language: "javascript",
    },
    {
        content: "function isPrime(num) {\n  for (let i = 2; i < num; i++) if (num % i === 0) return false;\n  return num > 1;\n}",
        description: "Check if a number is prime.",
        language: "javascript",
    },
    {
        content: "function getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}",
        description: "Generate a random integer within a range.",
        language: "javascript",
    },
    {
        content: "function deepClone(obj) {\n  return JSON.parse(JSON.stringify(obj));\n}",
        description: "Deep clone an object.",
        language: "javascript",
    },
    {
        content: "function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}",
        description: "Debounce a function.",
        language: "javascript",
    },
    {
        content: "function throttle(func, limit) {\n  let inThrottle;\n  return function(...args) {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}",
        description: "Throttle a function.",
        language: "javascript",
    },
    {
        content: "function arrayChunk(arr, size) {\n  const chunkedArr = [];\n  for (let i = 0; i < arr.length; i += size) {\n    chunkedArr.push(arr.slice(i, i + size));\n  }\n  return chunkedArr;\n}",
        description: "Split an array into chunks.",
        language: "javascript",
    }
];