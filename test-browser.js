fetch('https://fakestoreapi.com/products')
  .then(res => {
    if (!res.ok) throw new Error(`Unexpected status: ${res.status}`);
    return res.json();
  })
  .then(products => {
    const defective = [];

    products.forEach((product, i) => {
      const issues = [];

      if (!product.title || product.title.trim() === '') {
        issues.push('Missing or empty title');
      }

      if (typeof product.price !== 'number' || product.price < 0) {
        issues.push('Negative or invalid price');
      }

      if (product.rating?.rate > 5) {
        issues.push('rating.rate exceeds 5');
      }

      if (issues.length > 0) {
        defective.push({ id: product.id, title: product.title, issues });
      }
    });

    if (defective.length > 0) {
      console.warn('Defective products found:', defective);
    } else {
      console.log('✅ All products passed validation.');
    }
  })
  .catch(console.error);
