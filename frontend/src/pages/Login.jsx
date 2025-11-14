import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Connexion");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      if (currentState === "Créer un Compte") {
        // Validation
        if (!name || !email || !password) {
          toast.error("Veuillez remplir tous les champs");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          toast.error("Le mot de passe doit contenir au moins 6 caractères");
          setLoading(false);
          return;
        }

        // Inscription
        const response = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Compte créé avec succès!");
          navigate("/");
        } else {
          toast.error(response.data.message || "Erreur lors de la création du compte");
        }
      } else {
        // Connexion
        if (!email || !password) {
          toast.error("Veuillez remplir tous les champs");
          setLoading(false);
          return;
        }

        const response = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Connexion réussie!");
          navigate("/");
        } else {
          toast.error(response.data.message || "Email ou mot de passe incorrect");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        toast.error("Email ou mot de passe incorrect");
      } else if (error.response?.status === 409) {
        toast.error("Cet email est déjà utilisé");
      } else {
        toast.error(error.response?.data?.message || "Une erreur s'est produite");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-full sm:max-w-96 gap-4 text-gray-800 bg-white p-8 rounded shadow-lg"
      >
        <div className="inline-flex items-center gap-2 mt-5 mb-5">
          <p className="text-3xl prata-regular">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === "Connexion" ? (
          ""
        ) : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            placeholder="Jean Dupont"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          placeholder="votre.email@gmail.com"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          placeholder="Mot de passe"
          required
        />

        <div className="flex justify-between w-full text-sm mt-2 gap-4">
          <p className="cursor-pointer text-blue-600 hover:underline">Mot de passe oublié?</p>
          {currentState === "Connexion" ? (
            <p
              onClick={() => {
                setCurrentState("Créer un Compte");
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Créer un compte
            </p>
          ) : (
            <p
              onClick={() => {
                setCurrentState("Connexion");
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Se connecter
            </p>
          )}
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full px-8 py-3 mt-6 font-semibold text-white bg-black rounded transition-all duration-500 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Chargement..." : (currentState === "Connexion" ? "Se Connecter" : "Créer un Compte")}
        </button>
      </form>
    </div>
  );
};

export default Login;
