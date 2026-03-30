import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'es' | 'en';

const translations = {
  es: {
    // BottomNav
    nav_home: 'Inicio',
    nav_health: 'Salud',
    nav_vets: 'Vets',
    nav_store: 'Tienda',
    nav_profile: 'Perfil',
    // Home
    your_pet: 'Tu Mascota',
    status_ar: 'Estado en Realidad Aumentada',
    deep_calm: 'Calma Profunda',
    health_mood: 'Salud y Ánimo',
    see_all: 'Ver Todo',
    stable_rhythm: 'Ritmo Estable',
    emotional_flow: 'Flujo Emocional',
    real_time: 'En Tiempo Real',
    safe_location: 'Ubicación Segura',
    open_map: 'Abrir Mapa',
    safe_zone_active: 'Zona Segura Activa',
    protected_home: 'Protegido en perímetro de Casa',
    view_store: 'Ver Tienda',
    env_factors: 'Factores de Entorno',
    temp_optimal: '22°C Óptimo',
    low_noise: 'Ruido Bajo',
    soft_light: 'Luz Suave',
    upload_photo: 'Subir foto de tu mascota',
    // Health
    optimal_health: 'Salud óptima',
    years: 'años',
    nutrition: 'NUTRICIÓN',
    live: 'EN VIVO',
    heart_rate: 'Ritmo Cardíaco',
    activity: 'Actividad',
    steps: 'pasos',
    sleep_quality: 'Calidad de Sueño',
    stress_level: 'Nivel de Estrés',
    low: 'Bajo',
    temperature: 'Temperatura',
    normal: 'Normal',
    average: 'Promedio',
    quality: 'Calidad',
    // Profile
    owner: 'Dueño',
    setup_pending: 'Configuración pendiente',
    edit_profile: 'Editar Perfil',
    your_name: 'Tu Nombre',
    enter_name_placeholder: 'Escribe tu nombre',
    dog_name: 'Nombre del Perro',
    pet_name_placeholder: 'Nombre de tu mascota',
    breed: 'Raza',
    breed_placeholder: 'Ej: Golden',
    age: 'Edad',
    age_placeholder: 'Años',
    cancel: 'Cancelar',
    save: 'Guardar',
    account_settings: 'Configuración de Cuenta',
    notifications: 'Notificaciones',
    privacy_security: 'Privacidad y Seguridad',
    payment_methods: 'Métodos de Pago',
    logout: 'Cerrar Sesión',
    version: 'Versión 1.0.0 (Beta)',
    // Vets
    vets_title: 'Veterinarios',
    vets_subtitle: 'Clínicas cercanas a tu ubicación',
    location_detected: 'Ubicación detectada',
    detecting_location: 'Detectando tu ubicación…',
    searching_vets: 'Buscando veterinarios cercanos…',
    geo_error_title: 'No pudimos acceder a tu ubicación.',
    geo_error_hint: 'Activa los permisos de geolocalización en tu navegador.',
    try_again: 'Intentar de nuevo',
    fetch_error_title: 'Error al buscar veterinarios.',
    fetch_error_hint: 'Comprueba tu conexión e intenta de nuevo.',
    retry: 'Reintentar',
    no_vets: 'No se encontraron veterinarios en un radio de 6 km.',
    search_again: 'Buscar de nuevo',
    address_unavailable: 'Dirección no disponible',
    veterinary: 'Veterinaria',
    get_directions: 'Cómo llegar',
    // Store
    search_placeholder: 'Buscar productos...',
    add_to_cart: 'Añadir al carrito',
    all: 'Todos',
    accessories: 'Accesorios',
    transport: 'Transporte',
    kit: 'Kit Completo',
    rest: 'Descanso',
    clothing: 'Ropa',
    care: 'Cuidado',
    // Login
    login_h_login: '¡Hola de nuevo!',
    login_h_signup: 'Crea tu cuenta',
    login_sub_login: 'Te extrañábamos por aquí.',
    login_sub_signup: 'Regístrate para comenzar la experiencia.',
    login_p_login: 'Únete a la mejor comunidad de cuidado canino asistido por IA.',
    login_p_signup: 'Crea una cuenta personalizada y empieza a entender sus emociones hoy mismo.',
    login_photo_label: 'Foto de\ntu perro',
    login_optional: 'Opcional pero recomendado',
    login_name_label: 'Tu Nombre',
    login_name_placeholder: 'Ej. Gabriel',
    login_email_label: 'Usuario / Email',
    login_password_label: 'Contraseña',
    login_btn_login: 'Iniciar Sesión',
    login_btn_signup: 'Crear Cuenta Nueva',
    login_or: 'O continúa con',
    login_no_account: '¿No tienes cuenta?',
    login_have_account: '¿Ya eres parte?',
    login_create: 'Crea una nueva',
    login_signin: 'Inicia sesión',
    login_error: 'Credenciales incorrectas. Intenta con usuario / 1111',
  },
  en: {
    // BottomNav
    nav_home: 'Home',
    nav_health: 'Health',
    nav_vets: 'Vets',
    nav_store: 'Store',
    nav_profile: 'Profile',
    // Home
    your_pet: 'Your Pet',
    status_ar: 'Augmented Reality Status',
    deep_calm: 'Deep Calm',
    health_mood: 'Health & Mood',
    see_all: 'See All',
    stable_rhythm: 'Stable Rhythm',
    emotional_flow: 'Emotional Flow',
    real_time: 'Real Time',
    safe_location: 'Safe Location',
    open_map: 'Open Map',
    safe_zone_active: 'Active Safe Zone',
    protected_home: 'Protected within Home perimeter',
    view_store: 'View Store',
    env_factors: 'Environment Factors',
    temp_optimal: '22°C Optimal',
    low_noise: 'Low Noise',
    soft_light: 'Soft Light',
    upload_photo: 'Upload your pet photo',
    // Health
    optimal_health: 'Optimal health',
    years: 'years',
    nutrition: 'NUTRITION',
    live: 'LIVE',
    heart_rate: 'Heart Rate',
    activity: 'Activity',
    steps: 'steps',
    sleep_quality: 'Sleep Quality',
    stress_level: 'Stress Level',
    low: 'Low',
    temperature: 'Temperature',
    normal: 'Normal',
    average: 'Average',
    quality: 'Quality',
    // Profile
    owner: 'Owner',
    setup_pending: 'Setup pending',
    edit_profile: 'Edit Profile',
    your_name: 'Your Name',
    enter_name_placeholder: 'Enter your name',
    dog_name: "Dog's Name",
    pet_name_placeholder: "Your pet's name",
    breed: 'Breed',
    breed_placeholder: 'E.g.: Golden',
    age: 'Age',
    age_placeholder: 'Years',
    cancel: 'Cancel',
    save: 'Save',
    account_settings: 'Account Settings',
    notifications: 'Notifications',
    privacy_security: 'Privacy & Security',
    payment_methods: 'Payment Methods',
    logout: 'Log Out',
    version: 'Version 1.0.0 (Beta)',
    // Vets
    vets_title: 'Veterinarians',
    vets_subtitle: 'Clinics near your location',
    location_detected: 'Location detected',
    detecting_location: 'Detecting your location…',
    searching_vets: 'Searching for nearby vets…',
    geo_error_title: 'We could not access your location.',
    geo_error_hint: 'Enable geolocation permissions in your browser.',
    try_again: 'Try again',
    fetch_error_title: 'Error finding veterinarians.',
    fetch_error_hint: 'Check your connection and try again.',
    retry: 'Retry',
    no_vets: 'No veterinarians found within 6 km radius.',
    search_again: 'Search again',
    address_unavailable: 'Address not available',
    veterinary: 'Veterinary',
    get_directions: 'Get directions',
    // Store
    search_placeholder: 'Search products...',
    add_to_cart: 'Add to cart',
    all: 'All',
    accessories: 'Accessories',
    transport: 'Transport',
    kit: 'Full Kit',
    rest: 'Rest',
    clothing: 'Clothing',
    care: 'Care',
    // Login
    login_h_login: 'Welcome back!',
    login_h_signup: 'Create your account',
    login_sub_login: 'We missed you.',
    login_sub_signup: 'Sign up to start the experience.',
    login_p_login: 'Join the best AI-assisted canine care community.',
    login_p_signup: 'Create a personalised account and start understanding your dog\'s emotions today.',
    login_photo_label: 'Your dog\nphoto',
    login_optional: 'Optional but recommended',
    login_name_label: 'Your Name',
    login_name_placeholder: 'E.g. Gabriel',
    login_email_label: 'Username / Email',
    login_password_label: 'Password',
    login_btn_login: 'Log In',
    login_btn_signup: 'Create New Account',
    login_or: 'Or continue with',
    login_no_account: "Don't have an account?",
    login_have_account: 'Already have an account?',
    login_create: 'Create one',
    login_signin: 'Log in',
    login_error: 'Incorrect credentials. Try username / 1111',
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('df_lang') as Lang) || 'es';
  });

  const setLang = (l: Lang) => {
    localStorage.setItem('df_lang', l);
    setLangState(l);
  };

  const t = (key: TranslationKey): string => translations[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
