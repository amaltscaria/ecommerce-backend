import productsData from '../data/products.json' with { type: 'json' };
import fs from 'fs';

// Load products into memory for manipulation
let products = [...productsData];

export const getAllProducts = async (req, res) => {
    try {
        // Handle category filtering
        const { category } = req.query;
        
        if (category) {
            const filteredProducts = products.filter(product => 
                product.category.toLowerCase() === category.toLowerCase()
            );
            return res.status(200).json({
                success: true,
                count: filteredProducts.length,
                products: filteredProducts
            });
        }
        
        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = products.find(product => product.id === +id);
        
        if (!product) {
            return res.status(404).json({
                success: false, 
                message: 'Product not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, category, price, description, stock, image } = req.body;
        
        // Validation
        if (!name || !category || !price) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, category, price'
            });
        }
        
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a positive number'
            });
        }
        
        if (stock && (isNaN(stock) || stock < 0)) {
            return res.status(400).json({
                success: false,
                message: 'Stock must be a non-negative number'
            });
        }
        
        // Generate new ID
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        
        const newProduct = {
            id: newId,
            name: name.trim(),
            category: category.trim(),
            price: parseFloat(price),
            description: description?.trim() || '',
            stock: stock ? parseInt(stock) : 0,
            image: image || ''
        };
        
        products.push(newProduct);

         fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
        
        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}