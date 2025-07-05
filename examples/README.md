# GremLLM Examples

This directory contains examples demonstrating the GremLLM library. Each example can be run with `deno run -A`.

## Prerequisites

Set your OpenAI API key:
```bash
export OPENAI_API_KEY="your-api-key-here"
```

## Examples

### 1. Counter (`counter.js`)
A simple counter that demonstrates basic state management.

```bash
deno run -A examples/counter.js
```

**Features demonstrated:**
- Basic method generation
- State persistence in `_context`
- Simple arithmetic operations
- Verbose mode showing generated code

### 2. Calculator (`calculator.js`)
A scientific calculator with advanced mathematical functions.

```bash
deno run -A examples/calculator.js
```

**Features demonstrated:**
- Complex mathematical operations
- Memory storage and recall
- Trigonometric functions
- Operation history tracking

### 3. Shopping Cart (`shopping-cart.js`)
A shopping cart system with item management and pricing.

```bash
deno run -A examples/shopping-cart.js
```

**Features demonstrated:**
- Complex object manipulation
- Array/list management
- Discount calculations
- Data summarization

## What to Expect

Each example runs with `verbose: true`, so you'll see:
- The generated JavaScript code for each method
- How the LLM interprets and implements your requests
- The actual results of the operations

The examples show how GremLLM can dynamically create methods that maintain state and implement complex behavior without any pre-defined code.