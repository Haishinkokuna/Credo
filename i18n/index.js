import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// Define the exact translations
const translations = {
  en: {
    welcome: 'Welcome to Credo',
    discovery: 'Discovery',
    analytics: 'Analytics',
    tracker: 'Tracker',
    notification_reminder: 'There are new job offers, are you ready to find that dream job?',
    reconnecting: 'Reconnecting to Network...',
    add_job: 'Add Job',
    company_name: 'Company Name',
    position_title: 'Position Title',
    job_link: 'Job Link',
    notes: 'Notes',
    cancel: 'Cancel',
    save: 'Save',
    empty_jobs: 'No jobs added yet',
    join_network: 'Join the Network',
    auth_subtitle: 'Sign in to view and share job recommendations.',
    email_placeholder: 'email@address.com',
    password: 'Password',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    contacted: 'Contacted',
    interview: 'Interview',
    hired: 'Hired',
    date_published: 'Date Published',
    date_applied: 'Date Applied',
    total_jobs: 'Total Jobs',
    contact_rate: 'Contact Rate',
    interview_rate: 'Interview Rate',
    note_title: 'Note Title',
    note_description: 'Description',
    note_date: 'Date',
    add_note: 'Add Note',
    no_notes: 'No notes yet.',
    name: 'Name',
    gender: 'Gender (Optional)',
    dob: 'Date of Birth',
    confirm_email: 'Confirm Email',
    confirm_password: 'Confirm Password',
    already_have_account: 'Already have an account? Sign In',
    need_account: 'Don\'t have an account? Sign Up',
    err_name_req: 'Name is required',
    err_dob_req: 'Date of Birth is required',
    err_email_invalid: 'Invalid email address',
    err_email_mismatch: 'Emails do not match',
    err_pwd_length: 'Password must be at least 8 characters',
    err_pwd_special: 'Password must contain a special character and a number',
    err_pwd_mismatch: 'Passwords do not match',
    err_fill_required: 'Please fill all required fields',
  },
  es: {
    welcome: 'Bienvenido a Credo',
    discovery: 'Descubrimiento',
    analytics: 'Analíticas',
    tracker: 'Rastreador',
    notification_reminder: '¡Tú puedes! Sigue buscando y encontrarás tu trabajo de sueños.',
    reconnecting: 'Reconectando a la red...',
    add_job: 'Agregar Trabajo',
    company_name: 'Nombre de la Empresa',
    position_title: 'Título del Puesto',
    job_link: 'Enlace del Trabajo',
    notes: 'Notas',
    cancel: 'Cancelar',
    save: 'Guardar',
    empty_jobs: 'Aún no has agregado trabajos',
    join_network: 'Unirse a la Red',
    auth_subtitle: 'Inicia sesión para ver y compartir recomendaciones de trabajo.',
    email_placeholder: 'correo@direccion.com',
    password: 'Contraseña',
    sign_in: 'Iniciar Sesión',
    sign_up: 'Registrarse',
    contacted: 'Contactado',
    interview: 'Entrevista',
    hired: 'Contratado',
    date_published: 'Fecha de Publicación',
    date_applied: 'Fecha de Aplicación',
    total_jobs: 'Trabajos Totales',
    contact_rate: 'Tasa de Contacto',
    interview_rate: 'Tasa de Entrevistas',
    note_title: 'Título de la Nota',
    note_description: 'Descripción',
    note_date: 'Fecha',
    add_note: 'Agregar Nota',
    no_notes: 'Sin notas aún.',
    name: 'Nombre',
    gender: 'Género (Opcional)',
    dob: 'Fecha de Nacimiento',
    confirm_email: 'Confirmar Correo',
    confirm_password: 'Confirmar Contraseña',
    already_have_account: '¿Ya tienes cuenta? Inicia sesión',
    need_account: '¿No tienes cuenta? Regístrate',
    err_name_req: 'El nombre es obligatorio',
    err_dob_req: 'La fecha de nacimiento es obligatoria',
    err_email_invalid: 'Dirección de correo inválida',
    err_email_mismatch: 'Los correos no coinciden',
    err_pwd_length: 'La contraseña debe tener al menos 8 caracteres',
    err_pwd_special: 'La contraseña debe contener un carácter especial y un número',
    err_pwd_mismatch: 'Las contraseñas no coinciden',
    err_fill_required: 'Por favor completa todos los campos obligatorios',
  },
};

// Initialize the Language Guard
export const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
// It acts as the "bouncer" - strictly checking the phone's language.
const systemLocales = getLocales();
const primaryLanguageCode = systemLocales.length > 0 ? systemLocales[0].languageCode : 'en';

// If the system language is explicitly 'es' (Spanish), use Spanish.
// For literally any other language, fall back to 'en' (English).
i18n.locale = primaryLanguageCode === 'es' ? 'es' : 'en';

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// Default fallback is English
i18n.defaultLocale = 'en';

export default i18n;
