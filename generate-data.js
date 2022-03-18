const faker = require('faker');
const fs = require('fs');

// Generate data vietnames
faker.locale = 'vi';

const randomCategoryList = (n) => {
  const categoryList = [];
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProduct) => {
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnailURl: faker.image.imageUrl(400, 400),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    });
  }
  return productList;
};

(() => {
  // Random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'MINH',
    },
  };

  // Write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data success');
  });
})();
