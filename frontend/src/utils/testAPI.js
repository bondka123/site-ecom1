import axios from 'axios';

// ✅ Configuration de test
const BACKEND_URL = 'http://localhost:4000';

// 🔧 Utilitaires de test
const testAPI = {
  // ✅ Test 1: Vérifier que le backend est accessible
  async testBackendConnection() {
    try {
      const response = await axios.get(`${BACKEND_URL}/`);
      console.log('✅ Backend connecté:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Erreur de connexion au backend:', error.message);
      return false;
    }
  },

  // ✅ Test 2: Récupérer la liste des produits
  async testGetProducts() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/product/list`);
      console.log('✅ Produits reçus:', response.data.products?.length || 0);
      return response.data.products || [];
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des produits:', error.message);
      return [];
    }
  },

  // ✅ Test 3: Ajouter un produit de test
  async testAddProduct() {
    try {
      const testProduct = {
        name: 'Test Product',
        description: 'Ceci est un produit de test',
        price: 29.99,
        category: 'Men',
        subCategory: 'Topwear',
        sizes: ['S', 'M', 'L', 'XL'],
        bestSeller: false,
        image: [],
      };
      
      const response = await axios.post(
        `${BACKEND_URL}/api/product/add`,
        testProduct
      );
      
      console.log('✅ Produit ajouté:', response.data.product?._id);
      return response.data.product;
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du produit:', error.message);
      return null;
    }
  },

  // ✅ Test 4: Enregistrer un utilisateur
  async testRegister() {
    try {
      const testUser = {
        name: 'Test User',
        email: `testuser${Date.now()}@test.com`,
        password: 'testpassword123',
      };
      
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        testUser
      );
      
      console.log('✅ Utilisateur enregistré, Token:', response.data.token?.substring(0, 20) + '...');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'enregistrement:', error.message);
      return null;
    }
  },

  // ✅ Test 5: Connexion admin
  async testAdminLogin() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/admin`, {
        email: 'admin@example.com',
        password: 'admin123',
      });
      
      console.log('✅ Admin connecté, Token:', response.data.token?.substring(0, 20) + '...');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la connexion admin:', error.message);
      return null;
    }
  },

  // ✅ Test 6: Vérifier le CORS
  async testCORS() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/product/list`,
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
      console.log('✅ CORS fonctionne correctement');
      return true;
    } catch (error) {
      console.error('❌ Problème CORS:', error.message);
      return false;
    }
  },
};

// 🚀 Fonction pour lancer tous les tests
export async function runAllTests() {
  console.log('🧪 Lancement des tests d\'API...\n');

  await testAPI.testBackendConnection();
  console.log('');

  await testAPI.testGetProducts();
  console.log('');

  await testAPI.testCORS();
  console.log('');

  console.log('🎯 Tests de lecture terminés!\n');
  
  console.log('Tests optionnels (modifient la base de données):');
  console.log('- testAPI.testAddProduct() - Ajouter un produit');
  console.log('- testAPI.testRegister() - Enregistrer un utilisateur');
  console.log('- testAPI.testAdminLogin() - Se connecter en admin');
}

export default testAPI;
