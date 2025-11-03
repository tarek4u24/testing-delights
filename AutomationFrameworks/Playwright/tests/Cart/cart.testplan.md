# 🧪 Test Plan: Add to Cart Flow

## Objective
Ensure users can add a product to the cart and verify its presence.

## Preconditions
- Product "Striped Cotton Sweater" exists and is visible on the homepage
- Cart is initially empty

## Test Cases

- [x] Navigate to homepage and verify title
- [x] Locate and open product detail page
- [x] Add product to cart
- [x] Navigate to cart
- [x] Verify product appears in cart table

## Notes
- Uses semantic locators (`getByRole`) for accessibility
- Page Object Model used for maintainability
- `test.step()` used for granular reporting
- Screenshot captured on failure for diagnostics
