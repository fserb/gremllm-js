#!/usr/bin/env -S deno run -A
import GremLLM from '../gremllm.js';

console.log('🧮 Counter Example');
console.log('=================');

const counter = new GremLLM('counter', { verbose: true });

console.log('\n1. Setting initial value to 0...');
await counter.setValue(0);

console.log('\n2. Incrementing counter...');
await counter.increment();

console.log('\n3. Incrementing again...');
await counter.increment();

console.log('\n4. Getting current value...');
const value = await counter.getValue();
console.log(`Counter value: ${value}`);

console.log('\n5. Adding 5 to counter...');
await counter.add(5);

console.log('\n6. Final value...');
const finalValue = await counter.getValue();
console.log(`Final counter value: ${finalValue}`);

console.log('\n7. Resetting counter...');
await counter.reset();

console.log('\n8. Value after reset...');
const resetValue = await counter.getValue();
console.log(`Reset counter value: ${resetValue}`);