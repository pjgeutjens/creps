export const tests = [
    {
        content: "function capitalize(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}",
        description: "Capitalize the first letter of a string.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
        description: "Reverse a string.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function findMax(arr) {\n  return Math.max(...arr);\n}",
        description: "Find the maximum number in an array.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function findMin(arr) {\n  return Math.min(...arr);\n}",
        description: "Find the minimum number in an array.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function sumArray(arr) {\n  return arr.reduce((acc, val) => acc + val, 0);\n}",
        description: "Sum all numbers in an array.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function isPalindrome(str) {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}",
        description: "Check if a string is a palindrome.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function arrayAverage(arr) {\n  const sum = arr.reduce((acc, val) => acc + val, 0);\n  return sum / arr.length;\n}",
        description: "Calculate the average of an array.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}",
        description: "Remove duplicates from an array.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function fibonacci(n) {\n  let [a, b] = [0, 1];\n  while (n-- > 0) [a, b] = [b, a + b];\n  return a;\n}",
        description: "Generate the nth Fibonacci number.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
        description: "Calculate the factorial of a number.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function countWords(str) {\n  return str.split(' ').filter(Boolean).length;\n}",
        description: "Count the number of words in a string.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function mergeArrays(arr1, arr2) {\n  return [...arr1, ...arr2];\n}",
        description: "Merge two arrays.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function toCamelCase(str) {\n  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());\n}",
        description: "Convert a string to camel case.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function isPrime(num) {\n  for (let i = 2; i < num; i++) if (num % i === 0) return false;\n  return num > 1;\n}",
        description: "Check if a number is prime.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}",
        description: "Generate a random integer within a range.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function deepClone(obj) {\n  return JSON.parse(JSON.stringify(obj));\n}",
        description: "Deep clone an object.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}",
        description: "Debounce a function.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function throttle(func, limit) {\n  let inThrottle;\n  return function(...args) {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}",
        description: "Throttle a function.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function arrayChunk(arr, size) {\n  const chunkedArr = [];\n  for (let i = 0; i < arr.length; i += size) {\n    chunkedArr.push(arr.slice(i, i + size));\n  }\n  return chunkedArr;\n}",
        description: "Split an array into chunks.",
        language: "javascript",
        mode: 'functions',
    },
    {
        content: "function capitalize(str: string): string {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}",
        description: "Capitalize the first letter of a string.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function reverseString(str: string): string {\n  return str.split('').reverse().join('');\n}",
        description: "Reverse a string.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function findMax(arr: number[]): number {\n  return Math.max(...arr);\n}",
        description: "Find the maximum number in an array.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function findMin(arr: number[]): number {\n  return Math.min(...arr);\n}",
        description: "Find the minimum number in an array.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function sumArray(arr: number[]): number {\n  return arr.reduce((acc, val) => acc + val, 0);\n}",
        description: "Sum all numbers in an array.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function isPalindrome(str: string): boolean {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}",
        description: "Check if a string is a palindrome.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function arrayAverage(arr: number[]): number {\n  const sum = arr.reduce((acc, val) => acc + val, 0);\n  return sum / arr.length;\n}",
        description: "Calculate the average of an array.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function removeDuplicates(arr: any[]): any[] {\n  return [...new Set(arr)];\n}",
        description: "Remove duplicates from an array.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function fibonacci(n: number): number {\n  let [a, b] = [0, 1];\n  while (n-- > 0) [a, b] = [b, a + b];\n  return a;\n}",
        description: "Generate the nth Fibonacci number.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function factorial(n: number): number {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
        description: "Calculate the factorial of a number.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function countWords(str: string): number {\n  return str.split(' ').filter(Boolean).length;\n}",
        description: "Count the number of words in a string.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function mergeArrays(arr1: any[], arr2: any[]): any[] {\n  return [...arr1, ...arr2];\n}",
        description: "Merge two arrays.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function toCamelCase(str: string): string {\n  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());\n}",
        description: "Convert a string to camel case.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function isPrime(num: number): boolean {\n  for (let i = 2; i < num; i++) if (num % i === 0) return false;\n  return num > 1;\n}",
        description: "Check if a number is prime.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function getRandomInt(min: number, max: number): number {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}",
        description: "Generate a random integer within a range.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function deepClone<T>(obj: T): T {\n  return JSON.parse(JSON.stringify(obj));\n}",
        description: "Deep clone an object.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function debounce(func: Function, wait: number): Function {\n  let timeout: ReturnType<typeof setTimeout> | null;\n  return function(...args: any[]) {\n    if (timeout !== null) {\n      clearTimeout(timeout);\n    }\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}",
        description: "Debounce a function.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function throttle(func: Function, limit: number): Function {\n  let inThrottle: boolean;\n  return function(...args: any[]) {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}",
        description: "Throttle a function.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: "function arrayChunk<T>(arr: T[], size: number): T[][] {\n  const chunkedArr: T[][] = [];\n  for (let i = 0; i < arr.length; i += size) {\n    chunkedArr.push(arr.slice(i, i + size));\n  }\n  return chunkedArr;\n}",
        description: "Split an array into chunks.",
        language: "typescript",
        mode: 'functions',
    },
    {
        content: `func capitalize(str string) string {
    return strings.ToUpper(str[:1]) + str[1:]
}`,
        description: "Capitalize the first letter of a string.",
        language: "golang",
        mode: 'functions',
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
        mode: 'functions',
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
        mode: 'functions',
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
        mode: 'functions',
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
        mode: 'functions',
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
        mode: 'functions',
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
        mode: 'functions',
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
        mode: 'functions',
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
        mode: 'functions',
    },
    {
        content: "def add(a, b):\n    return a + b",
        description: "Add two numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def subtract(a, b):\n    return a - b",
        description: "Subtract two numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def multiply(a, b):\n    return a * b",
        description: "Multiply two numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def divide(a, b):\n    return a / b",
        description: "Divide two numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def square(n):\n    return n * n",
        description: "Square a number.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def cube(n):\n    return n ** 3",
        description: "Cube a number.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def power(base, exponent):\n    return base ** exponent",
        description: "Raise a number to a power.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def sqrt(n):\n    return n ** 0.5",
        description: "Square root of a number.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def absolute(n):\n    return abs(n)",
        description: "Absolute value of a number.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)",
        description: "Factorial of a number.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a",
        description: "Nth Fibonacci number.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def is_even(n):\n    return n % 2 == 0",
        description: "Check if a number is even.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def is_odd(n):\n    return n % 2 != 0",
        description: "Check if a number is odd.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def max_of_three(a, b, c):\n    return max(a, b, c)",
        description: "Maximum of three numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def min_of_three(a, b, c):\n    return min(a, b, c)",
        description: "Minimum of three numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True",
        description: "Check if a number is prime.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a",
        description: "Greatest common divisor of two numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def lcm(a, b):\n    return abs(a*b) // gcd(a, b)",
        description: "Least common multiple of two numbers.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def reverse_string(s):\n    return s[::-1]",
        description: "Reverse a string.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def is_palindrome(s):\n    return s == s[::-1]",
        description: "Check if a string is a palindrome.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def count_vowels(s):\n    return sum(1 for char in s if char in 'aeiouAEIOU')",
        description: "Count the number of vowels in a string.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def merge_two_dicts(a, b):\n    c = a.copy()\n    c.update(b)\n    return c",
        description: "Merge two dictionaries.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def find_unique_elements(lst):\n    return list(set(lst))",
        description: "Find unique elements in a list.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def get_duplicates(lst):\n    return list(set([x for x in lst if lst.count(x) > 1]))",
        description: "Get duplicates from a list.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def rotate_list(lst, k):\n    return lst[-k:] + lst[:-k]",
        description: "Rotate a list by k elements.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def list_to_string(lst):\n    return ' '.join(lst)",
        description: "Convert a list to a string.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def string_to_list(s):\n    return s.split()",
        description: "Convert a string to a list.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def list_intersection(lst1, lst2):\n    return list(set(lst1) & set(lst2))",
        description: "Find the intersection of two lists.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def list_difference(lst1, lst2):\n    return list(set(lst1) - set(lst2))",
        description: "Find the difference between two lists.",
        language: "python",
        mode: 'functions',
    },
    {
        content: "def list_union(lst1, lst2):\n    return list(set(lst1) | set(lst2))",
        description: "Find the union of two lists.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def find_unique_elements(lst):
        unique = set(lst)
        return list(unique)`,
        description: "Find unique elements in a list.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def get_duplicates(lst):
        counts = {}
        for item in lst:
            counts[item] = counts.get(item, 0) + 1
        return [item for item, count in counts.items() if count > 1]`,
        description: "Get duplicates from a list.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def rotate_list(lst, k):
        k = k % len(lst)  # Ensure k is within the bounds of lst length
        return lst[-k:] + lst[:-k]`,
        description: "Rotate a list by k elements.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def list_to_string(lst):
        return ' '.join(map(str, lst))`,
        description: "Convert a list to a string.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def string_to_list(s):
        return s.split(' ')`,
        description: "Convert a string to a list.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def list_intersection(lst1, lst2):
        return list(set(lst1) & set(lst2))`,
        description: "Find the intersection of two lists.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def list_difference(lst1, lst2):
        return list(set(lst1) - set(lst2))`,
        description: "Find the difference between two lists.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `def list_union(lst1, lst2):
        return list(set(lst1) | set(lst2))`,
        description: "Find the union of two lists.",
        language: "python",
        mode: 'functions',
    },
    {
        content: `async function fetchData(url: string): Promise<any> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    }`,
        description: "Async function pattern for fetching data.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `class Singleton {
      private static instance: Singleton;
      
      private constructor() {}
      
      public static getInstance(): Singleton {
        if (!Singleton.instance) {
          Singleton.instance = new Singleton();
        }
        return Singleton.instance;
      }
    }`,
        description: "Singleton pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `interface Observer {
      update(data: any): void;
    }
    
    class ConcreteObserver implements Observer {
      update(data: any): void {
        console.log('Observer received data:', data);
      }
    }
    
    class Subject {
      private observers: Observer[] = [];
      
      addObserver(observer: Observer): void {
        this.observers.push(observer);
      }
      
      removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
      }
      
      notifyObservers(data: any): void {
        this.observers.forEach(observer => observer.update(data));
      }
    }`,
        description: "Observer pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `function curry(fn: Function): Function {
      return function curried(...args: any[]) {
        if (args.length >= fn.length) {
          return fn.apply(this, args);
        } else {
          return function(...args2: any[]) {
            return curried.apply(this, args.concat(args2));
          };
        }
      };
    }`,
        description: "Currying pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `function memoize(fn: Function): Function {
      const cache = new Map();
      return function(...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
          return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
      };
    }`,
        description: "Memoization pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `type Nullable<T> = T | null;
    
    function exampleFunction(value: Nullable<string>): void {
      if (value === null) {
        console.log('Value is null');
      } else {
        console.log('Value:', value);
      }
    }`,
        description: "Nullable type pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `type User = {
      id: number;
      name: string;
      email: string;
    };
    
    const users: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
    
    function findUserById(id: number): User | undefined {
      return users.find(user => user.id === id);
    }`,
        description: "Type alias and array of objects pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `function* generatorFunction() {
      yield 'First value';
      yield 'Second value';
      yield 'Third value';
    }
    
    const generator = generatorFunction();
    console.log(generator.next().value); // First value
    console.log(generator.next().value); // Second value
    console.log(generator.next().value); // Third value
    `,
        description: "Generator function pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `type Result<T> = { success: true; value: T } | { success: false; error: string };
    
    function divide(a: number, b: number): Result<number> {
      if (b === 0) {
        return { success: false, error: 'Division by zero' };
      }
      return { success: true, value: a / b };
    }`,
        description: "Result type pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function delayedLog(message: string, ms: number): Promise<void> {
      await delay(ms);
      console.log(message);
    }`,
        description: "Delay function pattern in TypeScript.",
        language: "typescript",
        mode: "patterns",
    },
    {
        content: `package main
    
    import (
        "fmt"
        "errors"
    )
    
    func divide(a, b float64) (float64, error) {
        if b == 0 {
            return 0, errors.New("division by zero")
        }
        return a / b, nil
    }
    
    func main() {
        result, err := divide(4, 2)
        if err != nil {
            fmt.Println("Error:", err)
        } else {
            fmt.Println("Result:", result)
        }
    }`,
        description: "Error handling pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import "fmt"
    
    type User struct {
        ID    int
        Name  string
        Email string
    }
    
    var users = []User{
        {ID: 1, Name: "Alice", Email: "alice@example.com"},
        {ID: 2, Name: "Bob", Email: "bob@example.com"},
    }
    
    func findUserByID(id int) *User {
        for _, user := range users {
            if user.ID == id {
                return &user
            }
        }
        return nil
    }
    
    func main() {
        user := findUserByID(1)
        if user != nil {
            fmt.Println("User found:", user.Name)
        } else {
            fmt.Println("User not found")
        }
    }`,
        description: "Struct and slice of structs pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import "fmt"
    
    func fibonacci(n int) []int {
        fibs := make([]int, n)
        fibs[0], fibs[1] = 0, 1
        for i := 2; i < n; i++ {
            fibs[i] = fibs[i-1] + fibs[i-2]
        }
        return fibs
    }
    
    func main() {
        fmt.Println(fibonacci(10))
    }`,
        description: "Fibonacci sequence pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import "fmt"
    
    func mapExample() {
        m := make(map[string]int)
        m["one"] = 1
        m["two"] = 2
        m["three"] = 3
    
        for key, value := range m {
            fmt.Println(key, value)
        }
    }
    
    func main() {
        mapExample()
    }`,
        description: "Map iteration pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import (
        "fmt"
        "time"
    )
    
    func main() {
        timer := time.NewTimer(2 * time.Second)
        <-timer.C
        fmt.Println("Timer expired")
    }`,
        description: "Timer pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import (
        "fmt"
        "sync"
    )
    
    func main() {
        var wg sync.WaitGroup
        for i := 1; i <= 5; i++ {
            wg.Add(1)
            go func(i int) {
                defer wg.Done()
                fmt.Println(i)
            }(i)
        }
        wg.Wait()
    }`,
        description: "WaitGroup pattern for goroutines in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import "fmt"
    
    func main() {
        ch := make(chan int, 1)
        ch <- 1
        select {
        case val := <-ch:
            fmt.Println(val)
        default:
            fmt.Println("No value received")
        }
    }`,
        description: "Select statement pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import "fmt"
    
    func main() {
        numbers := []int{1, 2, 3, 4, 5}
        for i, num := range numbers {
            fmt.Printf("Index: %d, Value: %d\\n", i, num)
        }
    }`,
        description: "Range loop pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import "fmt"
    
    func main() {
        defer fmt.Println("This will be printed last")
        fmt.Println("This will be printed first")
    }`,
        description: "Defer statement pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `package main
    
    import "fmt"
    
    func main() {
        type Person struct {
            Name string
            Age  int
        }
    
        p := Person{Name: "Alice", Age: 30}
        fmt.Println(p)
    }`,
        description: "Struct initialization pattern in Go.",
        language: "go",
        mode: "patterns",
    },
    {
        content: `def divide(a, b):
        if b == 0:
            raise ValueError("division by zero")
        return a / b
    
    try:
        result = divide(4, 2)
        print("Result:", result)
    except ValueError as e:
        print("Error:", e)`,
        description: "Error handling pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `class User:
        def __init__(self, user_id, name, email):
            self.id = user_id
            self.name = name
            self.email = email
    
    users = [
        User(1, "Alice", "alice@example.com"),
        User(2, "Bob", "bob@example.com")
    ]
    
    def find_user_by_id(user_id):
        for user in users:
            if user.id == user_id:
                return user
        return None
    
    user = find_user_by_id(1)
    if user:
        print("User found:", user.name)
    else:
        print("User not found")`,
        description: "Class and list of objects pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `def fibonacci(n):
        fibs = [0, 1]
        for i in range(2, n):
            fibs.append(fibs[-1] + fibs[-2])
        return fibs
    
    print(fibonacci(10))`,
        description: "Fibonacci sequence pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `def map_example():
        m = {"one": 1, "two": 2, "three": 3}
        for key, value in m.items():
            print(key, value)
    
    map_example()`,
        description: "Dictionary iteration pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `import time
    
    def timer_example():
        time.sleep(2)
        print("Timer expired")
    
    timer_example()`,
        description: "Timer pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `import threading
    
    def print_number(i):
        print(i)
    
    threads = []
    for i in range(1, 6):
        t = threading.Thread(target=print_number, args=(i,))
        threads.append(t)
        t.start()
    
    for t in threads:
        t.join()`,
        description: "Threading pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `import queue
    
    q = queue.Queue()
    q.put(1)
    
    try:
        val = q.get_nowait()
        print(val)
    except queue.Empty:
        print("No value received")`,
        description: "Queue and exception handling pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `numbers = [1, 2, 3, 4, 5]
    for i, num in enumerate(numbers):
        print(f"Index: {i}, Value: {num}")`,
        description: "Enumerate loop pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `def main():
        print("This will be printed first")
        print("This will be printed last")
    
    main()`,
        description: "Function definition and call pattern in Python.",
        language: "python",
        mode: "patterns",
    },
    {
        content: `class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age
    
    p = Person("Alice", 30)
    print(p.__dict__)`,
        description: "Class initialization pattern in Python.",
        language: "python",
        mode: "patterns",
    }
];