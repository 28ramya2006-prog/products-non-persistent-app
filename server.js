import express from 'express';
const app = express();
//middlewaree
app.use(express.json());
const products = [];
 
// create a new product - POST
// http://localhost:5000/products
//payload: {"id": 1, "name": "Laptop", "price": 50000}
app.post("/products", (req,res) => {
    const newProduct =req.body;
    products.push(newProduct);
    res
      .status(201)
      .json({message: "product created successfully", data: newProduct

    });
});
// Read all products - GET
// http://localhost:5000/products
app.get("/products", (req,res) => {
    res
       .status(200)
       .json({message: "products fecthed successfully", data: products});

});
// Read product by ID - GET 
// http://localhost:5000/products/:ID
app.get("/products/:id", (req,res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((prod) => prod.id === productId);
    if(product){
        res
          .status(200)
          .json({message: "product details fetched successfully", data: product});
    } else {
        res
           .status(404)
           .json({message: "product not found"});
    } 
});
// update product by ID - PUT 
// http://localhost:5000/products/:ID
//payload: {"id": 1, "name": "Laptop", "price": 50000}
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = req.body;
    const productIndex = products.findIndex((prod) => prod.id === productId);
    if(productIndex!== -1){
        const updatedProduct = { ...products[productIndex], ...product};
        products[productIndex] = updatedProduct;
        res
          .status(200)
          .json({message: "product updated successfully", data: updatedProduct});
    } else {
        res
        .status(404)
        .json({"message": "product not found"});

    }
});
//Delete a product by Id - DELETE 
// http://localhost:5000/products/:ID
app.delete("/products/:id", (req,res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((prod) => prod.id === productId);
    if(productIndex !== -1){
        const deletedProduct = products.splice(productIndex, 1)[0];
        res
          .status(200)
          .json({message: "product deleted successfully", data: deletedProduct});
    } else {
        res
          .status(404)
          .json({message: "product not found"});

    }
});
app.listen(5000, () => {
    console.log("server running at http://localhost:5000/");
});