import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  getSingleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     tags:
 *       - Produits
 *     summary: Ajouter un produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - subCategory
 *               - sizes
 *             properties:
 *               name:
 *                 type: string
 *                 example: "T-shirt Classique"
 *               description:
 *                 type: string
 *                 example: "T-shirt en coton 100%"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               category:
 *                 type: string
 *                 example: "Men"
 *               subCategory:
 *                 type: string
 *                 example: "Topwear"
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["S", "M", "L"]
 *               bestSeller:
 *                 type: boolean
 *                 example: false
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       201:
 *         description: Produit ajouté avec succès
 *       400:
 *         description: Données invalides
 */
productRouter.post("/add", upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), addProduct);

/**
 * @swagger
 * /api/product/remove:
 *   post:
 *     tags:
 *       - Produits
 *     summary: Supprimer un produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Produit supprimé
 */
productRouter.post("/remove", removeProduct);

/**
 * @swagger
 * /api/product/single:
 *   post:
 *     tags:
 *       - Produits
 *     summary: Récupérer un produit par ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Produit trouvé
 *       404:
 *         description: Produit non trouvé
 */
productRouter.post("/single", getSingleProduct);

/**
 * @swagger
 * /api/product/list:
 *   get:
 *     tags:
 *       - Produits
 *     summary: Lister tous les produits
 *     responses:
 *       200:
 *         description: Liste des produits
 */
productRouter.get("/list", listProducts);

export default productRouter;
