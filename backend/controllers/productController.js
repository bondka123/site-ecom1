import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Validation des champs obligatoires (sizes optionnel)
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({ 
        success: false, 
        message: "Tous les champs obligatoires doivent être remplis" 
      });
    }

    // Upload des images vers Cloudinary
    const image = [];
    const files = ['image1', 'image2', 'image3', 'image4'];

    for (const file of files) {
      if (req.files && req.files[file] && req.files[file][0]) {
        const fileBuffer = req.files[file][0];
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { 
                folder: "ecommerce/products",
                resource_type: "auto"
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(fileBuffer.buffer);
          });
          image.push(result.secure_url);
        } catch (uploadError) {
          console.error(`Erreur upload ${file}:`, uploadError.message);
        }
      }
    }

    // Images optionnelles - pas obligatoires

    // Création des données du produit
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: Array.isArray(sizes) ? sizes : (sizes ? JSON.parse(sizes) : []),
      bestSeller: bestSeller === "true" || bestSeller === true,
      image: image,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ 
      success: true, 
      message: "Produit ajouté avec succès", 
      product 
    });
  } catch (error) {
    console.error("Erreur ajout produit:", error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ 
      success: true, 
      products 
    });
  } catch (error) {
    console.error("Erreur liste produits:", error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: "ID du produit requis" 
      });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Produit non trouvé" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Produit supprimé avec succès" 
    });
  } catch (error) {
    console.error("Erreur suppression produit:", error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: "ID du produit requis" 
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Produit non trouvé" 
      });
    }

    res.status(200).json({ 
      success: true, 
      product 
    });
  } catch (error) {
    console.error("Erreur récupération produit:", error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct };