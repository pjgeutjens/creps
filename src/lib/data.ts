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
    },
    {
        content: "function capitalize(str: string): string {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}",
        description: "Capitalize the first letter of a string.",
        language: "typescript",
    },
    {
        content: "function reverseString(str: string): string {\n  return str.split('').reverse().join('');\n}",
        description: "Reverse a string.",
        language: "typescript",
    },
    {
        content: "function findMax(arr: number[]): number {\n  return Math.max(...arr);\n}",
        description: "Find the maximum number in an array.",
        language: "typescript",
    },
    {
        content: "function findMin(arr: number[]): number {\n  return Math.min(...arr);\n}",
        description: "Find the minimum number in an array.",
        language: "typescript",
    },
    {
        content: "function sumArray(arr: number[]): number {\n  return arr.reduce((acc, val) => acc + val, 0);\n}",
        description: "Sum all numbers in an array.",
        language: "typescript",
    },
    {
        content: "function isPalindrome(str: string): boolean {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}",
        description: "Check if a string is a palindrome.",
        language: "typescript",
    },
    {
        content: "function arrayAverage(arr: number[]): number {\n  const sum = arr.reduce((acc, val) => acc + val, 0);\n  return sum / arr.length;\n}",
        description: "Calculate the average of an array.",
        language: "typescript",
    },
    {
        content: "function removeDuplicates(arr: any[]): any[] {\n  return [...new Set(arr)];\n}",
        description: "Remove duplicates from an array.",
        language: "typescript",
    },
    {
        content: "function fibonacci(n: number): number {\n  let [a, b] = [0, 1];\n  while (n-- > 0) [a, b] = [b, a + b];\n  return a;\n}",
        description: "Generate the nth Fibonacci number.",
        language: "typescript",
    },
    {
        content: "function factorial(n: number): number {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
        description: "Calculate the factorial of a number.",
        language: "typescript",
    },
    {
        content: "function countWords(str: string): number {\n  return str.split(' ').filter(Boolean).length;\n}",
        description: "Count the number of words in a string.",
        language: "typescript",
    },
    {
        content: "function mergeArrays(arr1: any[], arr2: any[]): any[] {\n  return [...arr1, ...arr2];\n}",
        description: "Merge two arrays.",
        language: "typescript",
    },
    {
        content: "function toCamelCase(str: string): string {\n  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());\n}",
        description: "Convert a string to camel case.",
        language: "typescript",
    },
    {
        content: "function isPrime(num: number): boolean {\n  for (let i = 2; i < num; i++) if (num % i === 0) return false;\n  return num > 1;\n}",
        description: "Check if a number is prime.",
        language: "typescript",
    },
    {
        content: "function getRandomInt(min: number, max: number): number {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}",
        description: "Generate a random integer within a range.",
        language: "typescript",
    },
    {
        content: "function deepClone<T>(obj: T): T {\n  return JSON.parse(JSON.stringify(obj));\n}",
        description: "Deep clone an object.",
        language: "typescript",
    },
    {
        content: "function debounce(func: Function, wait: number): Function {\n  let timeout: ReturnType<typeof setTimeout> | null;\n  return function(...args: any[]) {\n    if (timeout !== null) {\n      clearTimeout(timeout);\n    }\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}",
        description: "Debounce a function.",
        language: "typescript",
    },
    {
        content: "function throttle(func: Function, limit: number): Function {\n  let inThrottle: boolean;\n  return function(...args: any[]) {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}",
        description: "Throttle a function.",
        language: "typescript",
    },
    {
        content: "function arrayChunk<T>(arr: T[], size: number): T[][] {\n  const chunkedArr: T[][] = [];\n  for (let i = 0; i < arr.length; i += size) {\n    chunkedArr.push(arr.slice(i, i + size));\n  }\n  return chunkedArr;\n}",
        description: "Split an array into chunks.",
        language: "typescript",
    },
    {
        content: `func capitalize(str string) string {
    return strings.ToUpper(str[:1]) + str[1:]
}`,
        description: "Capitalize the first letter of a string.",
        language: "golang",
    },
    {
        content: `func reverseString(str string) string {
    runes := []rune(str)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}`,
        description: "Reverse a string.",
        language: "golang",
    },
    {
        content: `func findMax(arr []int) int {
    max := arr[0]
    for _, val := range arr {
        if val > max {
            max = val
        }
    }
    return max
}`,
        description: "Find the maximum number in an array.",
        language: "golang",
    },
    {
        content: `func findMin(arr []int) int {
    min := arr[0]
    for _, val := range arr {
        if val < min {
            min = val
        }
    }
    return min
}`,
        description: "Find the minimum number in an array.",
        language: "golang",
    },
    {
        content: `func sumArray(arr []int) int {
    sum := 0
    for _, val := range arr {
        sum += val
    }
    return sum
}`,
        description: "Sum all numbers in an array.",
        language: "golang",
    },
    {
        content: `func isPalindrome(str string) bool {
    for i := 0; i < len(str)/2; i++ {
        if str[i] != str[len(str)-i-1] {
            return false
        }
    }
    return true
}`,
        description: "Check if a string is a palindrome.",
        language: "golang",
    },
    {
        content: `func arrayAverage(arr []int) float64 {
    sum := 0
    for _, val := range arr {
        sum += val
    }
    return float64(sum) / float64(len(arr))
}`,
        description: "Calculate the average of an array.",
        language: "golang",
    },
    {
        content: `func removeDuplicates(arr []int) []int {
    encountered := map[int]bool{}
    result := []int{}

    for v := range arr {
        if !encountered[arr[v]] {
            encountered[arr[v]] = true
            result = append(result, arr[v])
        }
    }
    return result
}`,
        description: "Remove duplicates from an array.",
        language: "golang",
    },
    {
        content: `func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}`,
        description: "Generate the nth Fibonacci number.",
        language: "golang",
    },
    {
        content: "def add(a, b):\n    return a + b",
        description: "Add two numbers.",
        language: "python",
    },
    {
        content: "def subtract(a, b):\n    return a - b",
        description: "Subtract two numbers.",
        language: "python",
    },
    {
        content: "def multiply(a, b):\n    return a * b",
        description: "Multiply two numbers.",
        language: "python",
    },
    {
        content: "def divide(a, b):\n    return a / b",
        description: "Divide two numbers.",
        language: "python",
    },
    {
        content: "def square(n):\n    return n * n",
        description: "Square a number.",
        language: "python",
    },
    {
        content: "def cube(n):\n    return n ** 3",
        description: "Cube a number.",
        language: "python",
    },
    {
        content: "def power(base, exponent):\n    return base ** exponent",
        description: "Raise a number to a power.",
        language: "python",
    },
    {
        content: "def sqrt(n):\n    return n ** 0.5",
        description: "Square root of a number.",
        language: "python",
    },
    {
        content: "def absolute(n):\n    return abs(n)",
        description: "Absolute value of a number.",
        language: "python",
    },
    {
        content: "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)",
        description: "Factorial of a number.",
        language: "python",
    },
    {
        content: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a",
        description: "Nth Fibonacci number.",
        language: "python",
    },
    {
        content: "def is_even(n):\n    return n % 2 == 0",
        description: "Check if a number is even.",
        language: "python",
    },
    {
        content: "def is_odd(n):\n    return n % 2 != 0",
        description: "Check if a number is odd.",
        language: "python",
    },
    {
        content: "def max_of_three(a, b, c):\n    return max(a, b, c)",
        description: "Maximum of three numbers.",
        language: "python",
    },
    {
        content: "def min_of_three(a, b, c):\n    return min(a, b, c)",
        description: "Minimum of three numbers.",
        language: "python",
    },
    {
        content: "def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True",
        description: "Check if a number is prime.",
        language: "python",
    },
    {
        content: "def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a",
        description: "Greatest common divisor of two numbers.",
        language: "python",
    },
    {
        content: "def lcm(a, b):\n    return abs(a*b) // gcd(a, b)",
        description: "Least common multiple of two numbers.",
        language: "python",
    },
    {
        content: "def reverse_string(s):\n    return s[::-1]",
        description: "Reverse a string.",
        language: "python",
    },
    {
        content: "def is_palindrome(s):\n    return s == s[::-1]",
        description: "Check if a string is a palindrome.",
        language: "python",
    },
    {
        content: "def count_vowels(s):\n    return sum(1 for char in s if char in 'aeiouAEIOU')",
        description: "Count the number of vowels in a string.",
        language: "python",
    },
    {
        content: "def merge_two_dicts(a, b):\n    c = a.copy()\n    c.update(b)\n    return c",
        description: "Merge two dictionaries.",
        language: "python",
    },
    {
        content: "def find_unique_elements(lst):\n    return list(set(lst))",
        description: "Find unique elements in a list.",
        language: "python",
    },
    {
        content: "def get_duplicates(lst):\n    return list(set([x for x in lst if lst.count(x) > 1]))",
        description: "Get duplicates from a list.",
        language: "python",
    },
    {
        content: "def rotate_list(lst, k):\n    return lst[-k:] + lst[:-k]",
        description: "Rotate a list by k elements.",
        language: "python",
    },
    {
        content: "def list_to_string(lst):\n    return ' '.join(lst)",
        description: "Convert a list to a string.",
        language: "python",
    },
    {
        content: "def string_to_list(s):\n    return s.split()",
        description: "Convert a string to a list.",
        language: "python",
    },
    {
        content: "def list_intersection(lst1, lst2):\n    return list(set(lst1) & set(lst2))",
        description: "Find the intersection of two lists.",
        language: "python",
    },
    {
        content: "def list_difference(lst1, lst2):\n    return list(set(lst1) - set(lst2))",
        description: "Find the difference between two lists.",
        language: "python",
    },
    {
        content: "def list_union(lst1, lst2):\n    return list(set(lst1) | set(lst2))",
        description: "Find the union of two lists.",
        language: "python",
    }
];