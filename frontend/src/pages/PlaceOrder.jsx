import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, token, cartItems, getCartAmount, delivery_fee } = useContext(ShopContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    // Vérifier que l'utilisateur est connecté
    if (!token) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }

    // Vérifier que le panier n'est pas vide
    const cartCount = Object.keys(cartItems).length;
    if (cartCount === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Vérifier les champs requis
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street || !formData.city || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Simuler le traitement du paiement
      if (method === 'stripe') {
        toast.info("Stripe payment would be processed here");
        // En production, intégrer Stripe ici
      } else if (method === 'razorpay') {
        toast.info("Razorpay payment would be processed here");
        // En production, intégrer Razorpay ici
      } else if (method === 'cod') {
        toast.success("Order placed! Cash on delivery selected");
      }

      // Réinitialiser et naviguer
      setTimeout(() => {
        navigate('/orders');
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      toast.error("Error processing order");
      setIsProcessing(false);
    }
  };
  
  return (
    <div className='flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side Content */}
      <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
        <div className='my-3 text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder='First Name' 
            required
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder='Last Name' 
            required
          />
        </div>
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder='Email Address' 
          required
        />
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="text" 
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder='Street' 
          required
        />
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder='City' 
            required
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder='State' 
          />
        </div>
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="number" 
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder='Zip Code' 
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder='Country' 
          />
        </div>
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="tel" 
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder='Mobile' 
          required
        />
      </div>
      {/* Right Side Content */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        {/* Payment Methods Selection */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer hover:bg-gray-50'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-600 border-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer hover:bg-gray-50'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-600 border-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="RazorPay" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer hover:bg-gray-50'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600 border-green-600' : ''}`}></p>
              <p className='mx-4 text-sm font-medium text-gray-500'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full mt-8 text-end'>
            <button 
              onClick={handlePlaceOrder} 
              disabled={isProcessing}
              className='px-16 py-3 text-sm text-white bg-black active:bg-gray-800 disabled:bg-gray-400'
            >
              {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
