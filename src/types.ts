export interface PaymentMethod {
  id: string;
  type: 'VISA' | 'MASTERCARD' | 'PAYPAL';
  last4: string;
  expiry: string;
  holder: string;
  isDefault: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  petName?: string;
  petBreed?: string;
  petAge?: number;
  petWeight?: string;
  petGender?: 'Macho' | 'Hembra';
  phone?: string;
  notificationPreferences?: {
    push: boolean;
    health: boolean;
    activity: boolean;
    promos: boolean;
  };
  privacySettings?: {
    location: boolean;
    publicProfile: boolean;
  };
  paymentMethods?: PaymentMethod[];
  createdAt: string;
}

export interface HealthMetrics {
  bpm: number;
  steps: number;
  sleepHours: number;
  stressLevel: 'Bajo' | 'Medio' | 'Alto';
  temperature: number;
  timestamp: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  distance: number;
  duration: number;
  type: 'Paseo' | 'Juego' | 'Descanso';
}

export interface Place {
  id: string;
  name: string;
  type: 'Veterinaria' | 'Tienda' | 'Parque' | 'Marketplace';
  lat: number;
  lng: number;
  address: string;
  rating?: number;
}
