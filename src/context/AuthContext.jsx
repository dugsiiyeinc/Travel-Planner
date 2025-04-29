import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabses";
import ProfilePopup from "../pages/ProfilePopup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, firstName, lastName) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) throw error;
      
      return data.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw formatAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) throw error;
      if (!data?.user) throw new Error('No user returned from sign in');
      
      return data.user;
    } catch (error) {
      console.error("Signin error:", error);
      throw formatAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Signout error:", error);
      throw formatAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);
      
      const updates = {
        email,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      };

      const { error: updateError } = await supabase.auth.updateUser(updates);
      if (updateError) throw updateError;

      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password,
        });
        if (passwordError) throw passwordError;
      }

      return { error: null };
    } catch (error) {
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };


  const formatAuthError = (error) => {
    const errorMessage = error.message || 'Authentication failed';
    
    if (error.message.includes('Invalid login credentials')) {
      return new Error('The email or password you entered is incorrect');
    }
    if (error.message.includes('Email not confirmed')) {
      return new Error('Please verify your email before signing in');
    }
    if (error.message.includes('User already registered')) {
      return new Error('This email is already registered');
    }
    
    return new Error(errorMessage);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    ProfilePopup,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};