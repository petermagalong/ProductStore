import { sql } from "../config/db.js";
export const getProducts = async (req, res) => {
    try {
       const products = await sql`SELECT * FROM products ORDER BY id DESC`;
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Server Error"});
    }
}
export const createProduct =async (req, res) => {
    console.log("Request Body: ", req.body); // Log the request body to see what is being received
    const { name, image, price } = req.body;
    if(!name || !image || !price) {
        return res.status(400).json({success: false, message: "Please provide name, image and price"});
    }
    try {
        const newProduct = await sql`INSERT INTO products (name, image, price) VALUES (${name}, ${image}, ${price}) RETURNING *`;

        console.log("new product added : "+ newProduct);
        res.status(201).json({success: true, data: newProduct[0], message: "Product created successfully"});
    } catch (error) {
        console.error("createProduct error : "+error);
        res.status(500).json({success: false, message: "Server Error"});
    }
}
export const getProduct = async (req, res) => {
    try {
        const getProduct = await sql`SELECT * FROM products WHERE id = ${req.params.id}`;
            if(getProduct.length === 0) {
                return res.status(404).json({success: false, message: "Product not found"});
            }
        res.status(201).json({success: true, data: getProduct[0], message: "successfully fetched product"});
    } catch (error) {
        console.error("getProduct error : "+error);
        res.status(500).json({success: false, message: "Server Error"});
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { name, image, price } = req.body;
        const existingProduct = await sql`SELECT * FROM products WHERE id = ${req.params.id}`;
        if(existingProduct.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        const updatedProduct = await sql`
            UPDATE products 
            SET name = COALESCE(${name}, name), 
                image = COALESCE(${image}, image), 
                price = COALESCE(${price}, price),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${req.params.id} 
            RETURNING *
        `;
        res.status(200).json({success: true, data: updatedProduct[0], message: "Product updated successfully"});
    } catch (error) {
        console.error("updateProduct error : "+error);
        res.status(500).json({success: false, message: "Server Error"});
    } 
}
export const deleteProduct =async (req, res) => {
        try {
            console.log("Request to delete product with id: ", req.params.id); // Log the request params to see what is being received
        const existingProduct = await sql`SELECT * FROM products WHERE id = ${req.params.id}`;
        if(existingProduct.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        const deleteProduct = await sql`
            DELETE FROM products WHERE id = ${req.params.id} 
            RETURNING *
        `;
        res.status(200).json({success: true, data: deleteProduct[0], message: "Product delete successfully"});
    } catch (error) {
        console.error("updateProduct error : "+error);
        res.status(500).json({success: false, message: "Server Error"});
    } 
}

