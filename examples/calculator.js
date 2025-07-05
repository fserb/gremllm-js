#!/usr/bin/env -S deno run -A
import GremLLM from '../gremllm.js';

console.log('🧮 Calculator Example');
console.log('====================');

const calc = new GremLLM('scientific-calculator', { verbose: true });

console.log('\n1. Basic arithmetic...');
const sum = await calc.add(15, 25);
console.log(`15 + 25 = ${sum}`);

const product = await calc.multiply(7, 8);
console.log(`7 × 8 = ${product}`);

const quotient = await calc.divide(100, 4);
console.log(`100 ÷ 4 = ${quotient}`);

console.log('\n2. Advanced functions...');
const sqrt = await calc.sqrt(16);
console.log(`√16 = ${sqrt}`);

const power = await calc.power(2, 8);
console.log(`2^8 = ${power}`);

const factorial = await calc.factorial(5);
console.log(`5! = ${factorial}`);

console.log('\n3. Memory functions...');
await calc.storeMemory(42);
const memoryValue = await calc.recallMemory();
console.log(`Memory recall: ${memoryValue}`);

await calc.addToMemory(8);
const updatedMemory = await calc.recallMemory();
console.log(`Memory after adding 8: ${updatedMemory}`);

console.log('\n4. Trigonometry...');
const sine = await calc.sin(Math.PI / 2);
console.log(`sin(π/2) = ${sine}`);

const cosine = await calc.cos(0);
console.log(`cos(0) = ${cosine}`);

console.log('\n5. History...');
const history = await calc.getHistory();
console.log('Calculation history:', history);