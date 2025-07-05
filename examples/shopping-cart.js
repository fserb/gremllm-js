#!/usr/bin/env -S deno run -A
import GremLLM from "../gremllm.js";

console.log("🛒 Shopping Cart Example");
console.log("========================");

const cart = new GremLLM("shopping-cart", { verbose: true });

console.log("\n1. Adding items to cart...");
await cart.addItem("Apple", 1.50, 3);
await cart.addItem("Banana", 0.75, 6);
await cart.addItem("Orange", 2.00, 2);

console.log("\n2. Listing items...");
const items = await cart.listItems();
console.log("Items in cart:", items);

console.log("\n3. Calculating total...");
const total = await cart.calculateTotal();
console.log(`Total: $${total}`);

console.log("\n4. Applying discount...");
await cart.applyDiscount(10); // 10% discount
const discountedTotal = await cart.calculateTotal();
console.log(`Total after 10% discount: $${discountedTotal}`);

console.log("\n5. Removing an item...");
await cart.removeItem("Banana");
const updatedItems = await cart.listItems();
console.log("Items after removing bananas:", updatedItems);

console.log("\n6. Final total...");
const finalTotal = await cart.calculateTotal();
console.log(`Final total: $${finalTotal}`);

console.log("\n7. Getting cart summary...");
const summary = await cart.getSummary();
console.log("Cart summary:", summary);

console.log("\n8. Clearing cart...");
await cart.clear();
const emptyCart = await cart.listItems();
console.log("Cart after clearing:", emptyCart);

