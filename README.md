# GremLLM for Deno

This library allows you to create dynamic objects that generate methods and behavior on-the-fly using LLMs.

## What is GremLLM?

GremLLM creates "gremlins" - objects that can dynamically implement methods by asking an LLM to generate the code in real-time. When you call a method that doesn't exist, the object will use AI to figure out what you probably want and implement it.

## Installation

No installation required! Just import the module:

```javascript
import GremLLM from './gremllm.js';
```

You'll need an OpenAI API key. Set it as an environment variable:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

## Basic Usage

```javascript
import GremLLM from './gremllm.js';

// Create a counter object
const counter = new GremLLM('counter');

// These methods don't exist yet, but the LLM will implement them
await counter.setValue(0);
await counter.increment();      // LLM creates increment logic
await counter.increment();      // Uses the same logic
const value = await counter.getValue();  // LLM creates getValue logic

console.log(value); // 2
```

## Advanced Usage

### Verbose Mode

See the generated code:

```javascript
const calculator = new GremLLM('calculator', { verbose: true });

// This will print the generated code
const result = await calculator.add(5, 3);
console.log(result); // 8
```

### Wet Mode

Create chainable objects that return new GremLLM instances:

```javascript
const database = new GremLLM('database', { wet: true });

// Each method returns a new GremLLM object
const users = await database.getUsers();
const activeUsers = await users.filterActive();
const count = await activeUsers.count();
```

### Custom Configuration

```javascript
const assistant = new GremLLM('assistant', {
  verbose: true,
  wet: false,
  model: 'gpt-4',
  apiKey: 'your-custom-key',
  apiUrl: 'https://api.openai.com/v1/chat/completions'
});
```

## Examples

### Shopping Cart

```javascript
const cart = new GremLLM('shopping-cart');

await cart.addItem('apple', 1.50, 3);
await cart.addItem('banana', 0.75, 6);
const total = await cart.calculateTotal();
const items = await cart.listItems();

console.log(`Total: $${total}`);
console.log('Items:', items);
```

### Task Manager

```javascript
const tasks = new GremLLM('task-manager');

await tasks.addTask('Buy groceries', 'high');
await tasks.addTask('Walk the dog', 'medium');
await tasks.completeTask('Walk the dog');
const pending = await tasks.getPendingTasks();
```

### Game Character

```javascript
const player = new GremLLM('rpg-player');

await player.setName('Aragorn');
await player.setClass('Ranger');
await player.addExperience(1000);
const level = await player.calculateLevel();
const stats = await player.getStats();
```

## How It Works

1. **Proxy Interception**: Uses JavaScript Proxy to catch undefined method calls
2. **LLM Prompt**: Builds a context-aware prompt with the method name, arguments, and current state
3. **Code Generation**: Sends the prompt to an LLM (OpenAI GPT-4 by default)
4. **Safe Execution**: Executes the generated code in a controlled environment
5. **State Management**: Maintains object state in an internal `_context` object

## Options

- `verbose`: `boolean` - Show generated code (default: false)
- `wet`: `boolean` - Return new GremLLM instances for chaining (default: false)
- `apiKey`: `string` - OpenAI API key (default: from OPENAI_API_KEY env var)
- `model`: `string` - OpenAI model to use (default: 'gpt-4')
- `apiUrl`: `string` - API endpoint URL (default: OpenAI's endpoint)


## Credits

- Original concept and Python implementation: [gremllm](https://github.com/awwaiid/gremllm) by awwaiid

## Safety Notes

- Generated code is executed using `new Function()` - use with caution
- Only use with trusted LLM providers

