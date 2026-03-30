import { GoogleGenAI } from "@google/genai";

const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY || ''; 
const IS_DEMO = !API_KEY || API_KEY === 'YOUR_API_KEY_HERE';

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MOCK_TIPS = [
  "Basado en su actividad de hoy, {name} necesitará un aumento de hidratación y una cena rica en Omega-3. Recomendamos 15 minutos de juego ligero antes de dormir.",
  "{name} ha tenido un día muy activo. Asegúrate de revisar sus almohadillas y proporcionar un descanso ininterrumpido de al menos 4 horas esta tarde.",
  "La frecuencia cardíaca de {name} indica un estado de calma ideal. Es un buen momento para una sesión corta de entrenamiento cognitivo o juegos de olfato.",
  "Detección de ligero estrés ambiental. Se recomienda un paseo por una zona conocida y tranquila para estabilizar sus niveles de cortisol.",
  "¡Excelente nivel de energía! {name} se beneficiaría de un desafío físico mayor mañana por la mañana para mantener su equilibrio muscular."
];

const MOCK_PLACES = [
  { title: "Veterinaria San Antón", uri: "https://maps.google.com/?q=veterinaria+san+anton" },
  { title: "Bark & Brew Pet Store", uri: "https://maps.google.com/?q=bark+and+brew" },
  { title: "Parque Central Canino", uri: "https://maps.google.com/?q=parque+central+canino" },
  { title: "Clínica Veterinaria Amigos", uri: "https://maps.google.com/?q=clinica+veterinaria+amigos" }
];

export async function getWellnessTip(petInfo: { name: string; breed: string; age: number }, metrics: any) {
  if (IS_DEMO) {
    const tip = MOCK_TIPS[Math.floor(Math.random() * MOCK_TIPS.length)];
    return tip.replace("{name}", petInfo.name);
  }

  const model = "gemini-3-flash-preview";
  const prompt = `Analiza los siguientes datos de bienestar para ${petInfo.name} (${petInfo.breed}, ${petInfo.age} años):
  Métricas Actuales: ${JSON.stringify(metrics)}
  
  Proporciona un consejo de bienestar corto (máximo 2-3 frases), profesional, reconfortante y preciso en ESPAÑOL. 
  Enfócate en la recuperación, hidratación o optimización de la actividad según las métricas.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "Eres un experto mundial en bienestar canino. Tu tono es profesional, cercano y muy preciso. Siempre respondes en español.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching wellness tip:", error);
    const tip = MOCK_TIPS[0];
    return tip.replace("{name}", petInfo.name);
  }
}

export async function searchPetPlaces(location: { lat: number; lng: number }, query: string) {
  if (IS_DEMO) {
    // Return a subset of mock places based on the query to make it feel "real"
    const filtered = MOCK_PLACES.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || query.length > 3);
    return { 
      text: `He encontrado algunos lugares interesantes para ti y tu mascota relacionados con "${query}".`, 
      places: filtered.length > 0 ? filtered : [MOCK_PLACES[0]] 
    };
  }

  const model = "gemini-3-flash-preview";
  const prompt = `Busca ${query} cerca de latitud ${location.lat}, longitud ${location.lng}. 
  Responde con una frase breve introductoria en español sobre lo que encontraste.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: location.lat,
              longitude: location.lng,
            },
          },
        },
      },
    });
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    return {
      text: response.text,
      places: chunks?.map((c: any) => c.maps).filter(Boolean) || [],
    };
  } catch (error) {
    console.error("Error searching pet places:", error);
    return { 
      text: "En este momento no puedo acceder al mapa en tiempo real, pero aquí tienes algunas opciones habituales.", 
      places: MOCK_PLACES.slice(0, 2) 
    };
  }
}
export async function getPrivacyAudit(settings: { location: boolean; publicProfile: boolean }) {
  if (IS_DEMO) {
    const isHighRisk = settings.location && settings.publicProfile;
    if (isHighRisk) {
      return "⚠️ Tu perfil es muy visible. Recomendamos desactivar 'Perfil Público' si compartes tu ubicación en tiempo real para mayor seguridad.";
    }
    if (settings.location) {
      return "✅ Tu ubicación está activa para el rastreo de paseos. Los datos están encriptados y solo tú puedes ver el historial detallado.";
    }
    return "🛡️ Máxima privacidad activada. Tus rutas de paseo son privadas y no se comparten con otros usuarios.";
  }

  const model = "gemini-3-flash-preview";
  const prompt = `Analiza la configuración de privacidad actual del usuario:
  - Compartir Ubicación: ${settings.location ? 'Activado' : 'Desactivado'}
  - Perfil Público: ${settings.publicProfile ? 'Activado' : 'Desactivado'}
  
  Proporciona una recomendación de seguridad brevísima (1 frase) en español. 
  Si ambas están activadas, advierte sobre la visibilidad. Si la ubicación está desactivada, felicita por la privacidad.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "Eres un experto en ciberseguridad y privacidad digital para aplicaciones móviles. Tu tono es directo, profesional y preventivo.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching privacy audit:", error);
    return "Configuración optimizada para tu seguridad.";
  }
}
