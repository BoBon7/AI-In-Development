// Ensure response status is 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Parse response
let products = pm.response.json();

// Collect anomalies
let defectiveProducts = [];

products.forEach((product, index) => {
    let issues = [];

    // Check for title
    if (!product.title || product.title.trim() === "") {
        issues.push("Missing or empty title");
    }

    // Check for price
    if (typeof product.price !== "number" || product.price < 0) {
        issues.push("Negative or invalid price");
    }

    // Check for rating.rate
    if (product.rating && typeof product.rating.rate === "number" && product.rating.rate > 5) {
        issues.push("rating.rate exceeds 5");
    }

    if (issues.length > 0) {
        defectiveProducts.push({
            index: index,
            id: product.id,
            title: product.title,
            issues: issues
        });
    }
});

// Log defective items in console (for Postman)
console.log("Defective Products:", defectiveProducts);

// Set test result in Postman
pm.test("No defects found in product data", function () {
    pm.expect(defectiveProducts.length).to.equal(0);
});

// Optional: export defects to environment for later use
pm.environment.set("defectiveProducts", JSON.stringify(defectiveProducts));
