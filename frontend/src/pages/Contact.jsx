import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      // Simuler l'envoi du message
      console.log('Message envoyé:', formData);
      toast.success('Message envoyé avec succès! Merci de nous avoir contacté.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='pt-10 text-2xl text-center border-t'>
        <Title text1={'NOUS'} text2={'CONTACTER'} />
      </div>

      {/* Formulaire de Contact */}
      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28 max-w-6xl mx-auto px-4'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Photo" />
        
        <div className='flex flex-col gap-8 w-full md:w-1/2'>
          {/* Infos du magasin */}
          <div className='flex flex-col gap-4'>
            <p className='text-xl font-semibold text-gray-600'>📍 Notre Magasin</p>
            <p className='text-gray-500'>Trendify 354 Fashion Lane <br />Los Angeles, SC 45678, USA</p>
            <p className='text-gray-500'>📞 Tel: (+11)-558-669-447 <br />📧 Email: contact.trendify@info.com</p>
          </div>

          {/* Carrières */}
          <div className='flex flex-col gap-4'>
            <p className='text-xl font-semibold text-gray-600'>💼 Rejoignez Notre Équipe</p>
            <p className='text-gray-500'>Rejoignez Trendify! Explorez les opportunités d\'emploi et aidez-nous à façonner l\'avenir de la mode.</p>
            <button className='px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-gray-800 hover:text-white w-fit'>Voir les Offres</button>
          </div>
        </div>
      </div>

      {/* Formulaire d'Email */}
      <div className='max-w-2xl mx-auto px-4 mb-28'>
        <div className='pt-10 text-2xl text-center border-t mb-10'>
          <Title text1={'ENVOYER UN'} text2={'MESSAGE'} />
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-gray-50 p-8 rounded'>
          
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Votre Nom</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Jean Dupont'
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Votre Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='votre.email@gmail.com'
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Sujet</label>
            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={handleInputChange}
              placeholder='Sujet de votre message'
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Message</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Votre message ici...'
              rows='6'
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black resize-none'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='px-8 py-3 text-sm font-semibold text-white bg-black rounded transition-all duration-500 hover:bg-gray-800 disabled:opacity-50'
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
          </button>
        </form>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact
