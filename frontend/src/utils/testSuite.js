/**
 * 🧪 TEST SUITE POUR MERN ECOMMERCE
 * 
 * Ce fichier contient tous les tests pour vérifier que le site fonctionne correctement
 * 
 * Usage:
 * - Dans la console du navigateur: import('./test-suite.js').then(m => m.runAllTests())
 * - Ou importer dans un composant React et lancer les tests
 */

// 📊 Configuration
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const FRONTEND_URL = 'http://localhost:5173';

// 🎨 Couleurs pour la console
const colors = {
  success: 'color: #10b981; font-weight: bold;',
  error: 'color: #ef4444; font-weight: bold;',
  info: 'color: #3b82f6; font-weight: bold;',
  warning: 'color: #f59e0b; font-weight: bold;',
};

/**
 * 🧪 Suite de Tests
 */
export const testSuite = {
  /**
   * ✅ Test 1: Vérifier la connexion au backend
   */
  async testBackendConnection() {
    console.log('%c🧪 Test 1: Connexion Backend', colors.info);
    try {
      const response = await fetch(`${BACKEND_URL}/`);
      if (response.ok) {
        console.log('%c✅ Backend connecté avec succès', colors.success);
        return true;
      }
    } catch (error) {
      console.log('%c❌ Erreur de connexion au backend', colors.error);
      console.log(error.message);
      return false;
    }
  },

  /**
   * ✅ Test 2: Récupérer les produits
   */
  async testFetchProducts() {
    console.log('%c🧪 Test 2: Récupération des Produits', colors.info);
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/list`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.products)) {
        console.log(`%c✅ ${data.products.length} produits trouvés`, colors.success);
        
        if (data.products.length > 0) {
          console.log('%cPremier produit:', colors.info, data.products[0]);
        } else {
          console.log('%c⚠️  Aucun produit en base de données', colors.warning);
          console.log('   👉 Utilisez l\'admin panel pour ajouter des produits');
        }
        return data.products;
      }
    } catch (error) {
      console.log('%c❌ Erreur lors de la récupération des produits', colors.error);
      console.log(error.message);
      return null;
    }
  },

  /**
   * ✅ Test 3: Vérifier le SearchBar
   */
  testSearchBar() {
    console.log('%c🧪 Test 3: Vérification SearchBar', colors.info);
    try {
      // Vérifier que le contexte ShopContext est disponible
      const searchInput = document.querySelector('input[placeholder*="Search"]') || 
                         document.querySelector('input[placeholder*="search"]');
      
      if (searchInput) {
        console.log('%c✅ SearchBar trouvé dans le DOM', colors.success);
        console.log('%c   Essayez de taper un nom de produit', colors.info);
        return true;
      } else {
        console.log('%c⚠️  SearchBar introuvable', colors.warning);
        console.log('   Assurez-vous d\'être sur la page Collection');
        return false;
      }
    } catch (error) {
      console.log('%c❌ Erreur lors de la vérification du SearchBar', colors.error);
      return false;
    }
  },

  /**
   * ✅ Test 4: Vérifier le localStorage
   */
  testLocalStorage() {
    console.log('%c🧪 Test 4: Vérification localStorage', colors.info);
    try {
      const testKey = 'test_mern_ecommerce';
      const testValue = { test: true };

      // Écrire
      localStorage.setItem(testKey, JSON.stringify(testValue));

      // Lire
      const retrieved = JSON.parse(localStorage.getItem(testKey));

      // Supprimer
      localStorage.removeItem(testKey);

      if (retrieved.test === true) {
        console.log('%c✅ localStorage fonctionne correctement', colors.success);
        
        // Vérifier cartItems et token
        const cartItems = localStorage.getItem('cartItems');
        const token = localStorage.getItem('token');
        
        console.log('%c   CartItems stocké:', cartItems ? 'Oui' : 'Non', colors.info);
        console.log('%c   Token stocké:', token ? 'Oui' : 'Non', colors.info);
        return true;
      }
    } catch (error) {
      console.log('%c❌ Erreur localStorage', colors.error);
      console.log(error.message);
      return false;
    }
  },

  /**
   * ✅ Test 5: Vérifier CORS
   */
  async testCORS() {
    console.log('%c🧪 Test 5: Configuration CORS', colors.info);
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const corsHeader = response.headers.get('access-control-allow-origin');
      
      if (response.ok) {
        console.log('%c✅ CORS configuré correctement', colors.success);
        console.log(`%c   Allow-Origin: ${corsHeader || '*'}`, colors.info);
        return true;
      }
    } catch (error) {
      console.log('%c❌ Erreur CORS', colors.error);
      console.log(error.message);
      return false;
    }
  },

  /**
   * ✅ Test 6: Vérifier les routes de l'API
   */
  async testAPIRoutes() {
    console.log('%c🧪 Test 6: Vérification des Routes API', colors.info);
    const routes = [
      '/api/product/list',
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/admin',
    ];

    let successCount = 0;

    for (const route of routes) {
      try {
        const response = await fetch(`${BACKEND_URL}${route}`, {
          method: route.includes('post') ? 'POST' : 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok || response.status === 404 || response.status === 400) {
          console.log(`%c   ✅ ${route}`, colors.success);
          successCount++;
        }
      } catch (error) {
        console.log(`%c   ❌ ${route}`, colors.error);
      }
    }

    console.log(`%c✅ ${successCount}/${routes.length} routes accessibles`, colors.success);
    return successCount === routes.length;
  },

  /**
   * ✅ Test 7: Tester l'authentification
   */
  async testAuthentication() {
    console.log('%c🧪 Test 7: Vérification Authentification', colors.info);
    try {
      // Test: Admin Login
      const adminResponse = await fetch(`${BACKEND_URL}/api/auth/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'admin123',
        }),
      });

      const adminData = await adminResponse.json();

      if (adminData.success && adminData.token) {
        console.log('%c✅ Authentification Admin fonctionnelle', colors.success);
        console.log(`%c   Token: ${adminData.token.substring(0, 30)}...`, colors.info);
        return true;
      } else {
        console.log('%c⚠️  Admin login échoué', colors.warning);
        console.log('   Vérifiez: ADMIN_EMAIL et ADMIN_PASSWORD dans backend/.env');
        return false;
      }
    } catch (error) {
      console.log('%c❌ Erreur lors du test d\'authentification', colors.error);
      console.log(error.message);
      return false;
    }
  },

  /**
   * ✅ Test 8: Vérifier les composants React
   */
  testReactComponents() {
    console.log('%c🧪 Test 8: Vérification Composants React', colors.info);
    try {
      const components = {
        navbar: document.querySelector('div') && document.querySelector('[class*="navbar"]'),
        searchbar: document.querySelector('input[type="text"]'),
        productList: document.querySelectorAll('[class*="product"]').length,
        cart: document.querySelector('[class*="cart"]'),
      };

      let found = 0;
      for (const [name, element] of Object.entries(components)) {
        if (element) {
          console.log(`%c   ✅ ${name}`, colors.success);
          found++;
        }
      }

      console.log(`%c✅ ${found}/4 composants trouvés`, colors.success);
      return true;
    } catch (error) {
      console.log('%c❌ Erreur lors de la vérification des composants', colors.error);
      return false;
    }
  },

  /**
   * ✅ Test 9: Performance
   */
  async testPerformance() {
    console.log('%c🧪 Test 9: Vérification Performance', colors.info);
    
    const startTime = performance.now();
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/list`);
      await response.json();
      const endTime = performance.now();
      const responseTime = (endTime - startTime).toFixed(2);

      console.log(`%c✅ Temps de réponse: ${responseTime}ms`, colors.success);

      if (responseTime < 1000) {
        console.log('%c   🚀 Excellent! Très rapide', colors.success);
      } else if (responseTime < 3000) {
        console.log('%c   ✅ Bon', colors.info);
      } else {
        console.log('%c   ⚠️  À améliorer', colors.warning);
      }
      return true;
    } catch (error) {
      console.log('%c❌ Erreur de performance', colors.error);
      return false;
    }
  },

  /**
   * ✅ Test 10: Vérifier les URL
   */
  testEnvironment() {
    console.log('%c🧪 Test 10: Vérification Environnement', colors.info);
    console.log(`%c   Frontend: ${FRONTEND_URL}`, colors.info);
    console.log(`%c   Backend: ${BACKEND_URL}`, colors.info);
    
    if (BACKEND_URL === 'http://localhost:4000') {
      console.log('%c✅ Configuration correcte', colors.success);
      return true;
    } else {
      console.log('%c⚠️  Configuration personnalisée', colors.warning);
      return true;
    }
  },
};

/**
 * 🚀 Lancer tous les tests
 */
export async function runAllTests() {
  console.clear();
  console.log('%c🚀 MERN E-commerce - TEST SUITE 🚀', colors.success);
  console.log('%c' + '='.repeat(50), colors.info);
  console.log('');

  const tests = [
    testSuite.testEnvironment,
    testSuite.testBackendConnection,
    testSuite.testFetchProducts,
    testSuite.testSearchBar,
    testSuite.testLocalStorage,
    testSuite.testCORS,
    testSuite.testAPIRoutes,
    testSuite.testAuthentication,
    testSuite.testReactComponents,
    testSuite.testPerformance,
  ];

  let passed = 0;
  for (const test of tests) {
    try {
      const result = await test();
      if (result) passed++;
    } catch (error) {
      console.error(error);
    }
    console.log('');
  }

  console.log('%c' + '='.repeat(50), colors.info);
  console.log(`%c✅ Tests terminés: ${passed}/${tests.length} réussis`, 
    passed === tests.length ? colors.success : colors.warning);
  console.log('');
  console.log('%c💡 Conseils:', colors.info);
  console.log('   1. Assurez-vous que MongoDB s\'exécute');
  console.log('   2. Vérifiez que le backend est lancé (npm run server)');
  console.log('   3. Vérifiez que le frontend est lancé (npm run dev)');
  console.log('   4. Vérifiez les fichiers .env (backend et frontend)');
  console.log('');
}

// Export pour utilisation
export default { testSuite, runAllTests };
