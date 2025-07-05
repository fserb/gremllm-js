/**
 * GremLLM - A JavaScript class that dynamically generates methods using LLM
 * Similar to https://github.com/awwaiid/gremllm
 */

class GremLLM {
  constructor(name, options = {}) {
    this._name = name;
    this._context = {};
    this._verbose = options.verbose ?? false;
    this._wet = options.wet ?? false;
    this._apiKey = options.apiKey ?? Deno.env.get("OPENAI_API_KEY");
    this._model = options.model ?? "gpt-4";
    this._apiUrl = options.apiUrl ??
      "https://api.openai.com/v1/chat/completions";

    // Return a Proxy to intercept property access
    return new Proxy(this, {
      get(target, prop, receiver) {
        // Return existing properties/methods
        if (prop in target || typeof prop === "symbol") {
          return Reflect.get(target, prop, receiver);
        }

        // Handle private properties
        if (prop.startsWith("_")) {
          return undefined;
        }

        // Return a function that will generate the method dynamically
        return (...args) => target._handleDynamicCall(prop, args);
      },
    });
  }

  async _handleDynamicCall(methodName, args) {
    try {
      const prompt = this._buildPrompt(methodName, args);
      const code = await this._callLLM(prompt);

      if (this._verbose) {
        console.log(`Generated code for ${methodName}:`);
        console.log(code);
      }

      const result = this._executeCode(code, methodName, args);

      if (this._wet && typeof result === "object" && result !== null) {
        return new GremLLM(`${this._name}.${methodName}`, {
          verbose: this._verbose,
          wet: this._wet,
          apiKey: this._apiKey,
          model: this._model,
          apiUrl: this._apiUrl,
        });
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to execute ${methodName}: ${error.message}`);
    }
  }

  _buildPrompt(methodName, args) {
    const argsStr = args.map((arg, i) => `args[${i}]: ${JSON.stringify(arg)}`)
      .join(", ");

    return `You are a helpful AI assistant living inside a JavaScript object called '${this._name}'.
Someone is calling the method '${methodName}' on you and you need to respond by generating JavaScript code that will be executed in your context.

You have access to '_context' to store persistent data and '_name' for your identity.

Rules:
- Always respond with valid JavaScript code that can be executed
- Implement exactly what the user expects - be helpful and predictable
- You can access and modify _context to store persistent data
- Make the object behave naturally as a ${this._name} would
- This will be executed in Deno runtime
- Only use built-in JavaScript features and standard APIs
- Return a value from your code

Method being called: ${methodName}
Arguments: ${argsStr}
Your current memory (_context): ${JSON.stringify(this._context)}

What JavaScript code should be executed? Remember:
- You're a ${this._name}, so implement appropriate behavior
- Store persistent data in _context
- Use 'return' to return values
- Just execute the operation directly
- The code will be executed with access to _context, _name, and args array

Examples:
- For increment(): return (_context.value = (_context.value || 0) + 1);
- For add(x, y): return args[0] + args[1];
- For getName(): return _name;
- For setName(name): _context.name = args[0]; return _context.name;

Code:`;
  }

  async _callLLM(prompt) {
    const response = await fetch(this._apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this._apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this._model,
        messages: [
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  _executeCode(code, methodName, args) {
    // Create a safe execution context
    const context = {
      ...this._context,
      _name: this._name,
      _context: this._context,
      args: args,
    };

    // Create function with the generated code
    const func = new Function(
      "args",
      `
      const _context = ${JSON.stringify(context)};
      const _name = ${JSON.stringify(this._name)};
      ${code}
    `,
    );

    const result = func(args);

    // Update context if it was modified
    if (code.includes("_context")) {
      // Re-evaluate context to capture any changes
      const contextFunc = new Function(`
        const _context = ${JSON.stringify(this._context)};
        const _name = ${JSON.stringify(this._name)};
        ${code}
        return _context;
      `);
      this._context = contextFunc();
    }

    return result;
  }
}

export default GremLLM;

