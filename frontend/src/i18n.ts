import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof resources.en.translation;
    };
  }
}

const resources = {
  en: {
    translation: {
      commands: {
        search: 'Search',
        new_chat: 'Chat',
        settings: 'Settings',
      },
      navbar: {
        title: 'Beam!',
        home: 'Home',
        backends: 'Backends',
        settings: 'Settings',
        chat: 'Chat',
        chats: 'Chats',
        users: 'Users',
        demo: 'Demo',
        bye: 'Bye',
      },
      common: {
        delete: 'Delete',
        deleting: 'Deleting...',
        updating: 'Updating...',
        creating: 'Creating...',
        declaring: 'Declaring...',
        saving: 'Saving...',
        loading: 'Loading...',
        save: 'Save',
        welcome: 'Welcome',
        edit: 'Edit',
        type: 'Type',
        menu: 'Menu',
        cancel: 'Cancel',
        copyright: '© {{year}} Beam!',
        login: 'Login',
        logout: 'Logout',
        filter: 'Filter',
        filter_by: 'Filter by',
        clear_filter: 'Clear Filter',
        name: 'Name',
        id: 'ID',
        error: 'Error',
        items: 'item(s)',
        created_at: 'Created At:',
        updated_at: 'Updated:',
        resume: 'Resume',
        remove: 'remove',
      },
      pages: {
        not_found: 'Page not found',
        welcome_title: 'Welcome to Beam!',
      },
      footer: {
        about: 'Imprint',
        privacy: 'Privacy',
        contact: 'Contact',
      },
      errors: {
        backend_error: 'An error occurred: {{message}}',
        unknown: 'An unexpected error occurred',
        timeout: 'A timeout error occurred',
        invalidResponse: 'Bad response',
      },
      accesscontrol: {
        manage_title: 'Manage Access Control',
        resource: 'Resource',
        permission: 'Permission',
        identity: 'Identity',
        create_instruction: 'Create New Access Control',
        list_title: 'Existing Access Controls',
        list_loading: 'Loading access controls...',
        list_error: 'Error loading access controls',
        list_404: 'No access controls found',
        form_title_edit: 'Edit Access Control',
        form_title_create: 'Create New Access Control',
        form_create_action: 'Create Access Control',
        form_url: 'Base URL',
        form_type: 'Backend Type',
        form_update_action: 'Update Access Control',
        select_permission: 'Select Permission',
        select_resource: 'Select Resource',
      },
      backends: {
        section_title: 'Backends',
        section_description: 'Manage and Monitor LLM Backends',
        manage_title: 'Manage Backends',
        create_instruction: 'Create New Backend',
        list_title: 'Existing Backends',
        list_loading: 'Loading backends...',
        list_error: 'Error loading backends',
        list_404: 'No backends found',
        form_title_edit: 'Edit Backend',
        form_title_create: 'Create New Backend',
        form_create_action: 'Create Backend',
        form_url: 'Base URL',
        assign_to_pool: 'Assign to Pool',
        select_pool: 'Select Pool',
        form_type: 'Backend Type',
        form_update_action: 'Update Backend',
        download_status: 'Download Status',
      },
      pools: {
        section_title: 'Pools',
        section_description: 'Manage and Monitor LLM Pools',
        manage_title: 'Manage Pools',
        create_instruction: 'Create New Pool',
        list_title: 'Existing Pools',
        list_loading: 'Loading pools...',
        list_error: 'Error loading pools',
        list_404: 'No pools found',
        form_title_edit: 'Edit Pool',
        form_title_create: 'Create New Pool',
        form_create_action: 'Create Pool',
        form_url: 'Base URL',
        form_type: 'Pool Type',
        form_update_action: 'Update Pool',
        download_status: 'Download Status',
        purpose_type: 'Purpose Type',
      },
      state: {
        title: 'Backend State',
        panel_description: 'panel_description',
        not_found: 'No system state available',
        error_loading: 'Error loading system state',
        pulled_models: 'Pulled models',
        loading: 'Loading system state...',
      },
      downloads: {
        title: 'Download Queue',
        current: 'Current Queue',
        in_progress: 'In Progress',
      },
      model: {
        list_title: 'Existing Models',
        list_loading: 'Loading models...',
        declare_instrution: 'Declare Model',
        assign_to_pool: 'Assign to Pool',
        select_pool: 'Select Pool',
        list_error: 'Error loading models.',
        form_enter_name: 'Enter model name',
        model_delete: 'Delete Model',
      },
      chat: {
        conversation: 'Chat Conversation',
        error_create_chat: 'error_create_chat',
        no_chat_selected: 'No chat selected',
        loading_chats: 'Loading chats..',
        loading_history: 'Loading chat history...',
        list_error: 'Error loading chats',
        list_chats_404: 'No chats available. Start a new chat!',
        error_history: 'Error loading chat history',
        role_user: 'You',
        role_assistant: 'Assistant',
        input_placeholder: 'Type your message...',
        send_button: 'Send',
        sending_button: 'Sending...',
        timestamp: 'Sent: {{datetime}}',
        create_chat: 'Create Chat',
        select_model: 'Select Model',
        start_new_chat: 'Start a New Chat',
        loading_error: 'Error loading models.',
        interface_title: 'Chat Interface',
        personal_chat_list_title: 'Your Chats',
      },
      users: {
        manage_title: 'Manage Users',
        create_instruction: 'Create New User',
        list_title: 'Existing Users',
        list_loading: 'Loading users...',
        list_error: 'Error loading users',
        list_404: 'No users found',
        friendlyName: 'Name',
        email: 'Email',
        subject: 'Subject',
        password: 'Password',
        form_error: 'An error occurred while saving user data',
        saving: 'Saving...',
        save: 'Save',
        cancel: 'Cancel',
      },
      login: {
        title: 'Login',
        user_name: 'username',
        user_password: 'password',
        loading: 'loading',
        submit: 'Login',
        switch_to_register: 'Register',
      },
      register: {
        title: 'Register',
        error: 'Registration error: {{error}}',
        loading: 'Registering...',
        submit: 'Register',
        switch_to_login: 'Back to Login',
        email: 'Email',
        subject: 'Subject',
        password: 'Password',
        confirm_password: 'Confirm Password',
      },
    },
  },
  de: {
    translation: {
      commands: {
        search: 'Suchen',
        new_chat: 'Chat',
        settings: 'Einstellungen',
      },
      navbar: {
        title: 'Beam!',
        home: 'Startseite',
        backends: 'Backends',
        settings: 'Einstellungen',
        chat: 'Chat',
        chats: 'Chats',
        users: 'Benutzer',
        demo: 'Demo',
        bye: 'Tschüss',
      },
      common: {
        delete: 'Löschen',
        deleting: 'Löschen...',
        updating: 'Aktualisieren...',
        creating: 'Erstellen...',
        declaring: 'Deklarieren...',
        welcome: 'Willkommen',
        edit: 'Bearbeiten',
        type: 'Typ',
        menu: 'Menü',
        cancel: 'Abbrechen',
        copyright: '© {{year}} Beam',
        login: 'Anmelden', // Added
        logout: 'Abmelden', // Added
        name: 'Name',
        id: 'ID',
        error: 'Fehler',
        items: 'Element(e)',
        created_at: 'Erstellt am:',
        updated_at: 'Aktualisiert am:',
        resume: 'Fortsetzen',
        remove: 'entfernen',
      },
      pages: {
        not_found: 'Seite nicht gefunden',
        welcome_title: 'Willkommen bei Beam!',
      },
      footer: {
        about: 'Impressum',
        privacy: 'Datenschutz',
        contact: 'Kontakt',
      },
      errors: {
        backend_error: 'Ein Fehler ist aufgetreten: {{message}}',
        unknown: 'Ein unerwarteter Fehler ist aufgetreten',
        timeout: 'Ein Timeout-Fehler ist aufgetreten',
        invalidResponse: 'Ungültige Antwort',
      },
      accesscontrol: {
        section_title: 'Zugriffssteuerung',
        section_description: 'Zugriffssteuerung verwalten und überwachen',
        manage_title: 'Zugriffssteuerung verwalten',
        create_instruction: 'Neue Zugriffssteuerung erstellen',
        list_title: 'Vorhandene Zugriffssteuerungen',
        list_loading: 'Zugriffssteuerungen werden geladen...',
        list_error: 'Fehler beim Laden der Zugriffssteuerungen',
        list_404: 'Keine Zugriffssteuerungen gefunden',
        form_title_edit: 'Zugriffssteuerung bearbeiten',
        form_title_create: 'Neue Zugriffssteuerung erstellen',
        form_create_action: 'Zugriffssteuerung erstellen',
        form_url: 'Basis-URL',
        form_type: 'Zugriffssteuerung-Typ',
        form_update_action: 'Zugriffssteuerung aktualisieren',
      },
      backends: {
        section_title: 'Backends', // Added
        section_description: 'LLM-Backends verwalten und überwachen', // Added
        manage_title: 'Backends verwalten',
        create_instruction: 'Neues Backend erstellen',
        list_title: 'Vorhandene Backends',
        list_loading: 'Backends werden geladen...',
        list_error: 'Fehler beim Laden der Backends',
        list_404: 'Keine Backends gefunden',
        form_title_edit: 'Backend bearbeiten',
        form_title_create: 'Neues Backend erstellen',
        form_create_action: 'Backend erstellen',
        form_url: 'Basis-URL',
        form_type: 'Backend-Typ',
        form_update_action: 'Backend aktualisieren',
      },
      state: {
        title: 'Backend-Status',
        panel_description: 'Panel-Beschreibung', // Added (translated concept)
        not_found: 'Kein Systemstatus verfügbar',
        error_loading: 'Fehler beim Laden des Systemstatus',
        pulled_models: 'Heruntergeladene Modelle', // Corrected from 'Pulled models'
        loading: 'Systemstatus wird geladen...',
      },
      downloads: {
        title: 'Download-Warteschlange',
        current: 'Aktuelle Warteschlange',
        in_progress: 'In Bearbeitung',
      },
      model: {
        list_title: 'Vorhandene Modelle',
        list_loading: 'Modelle werden geladen...',
        declare_instrution: 'Modell deklarieren',
        list_error: 'Fehler beim Laden der Modelle.',
        form_enter_name: 'Modellnamen eingeben',
        model_delete: 'Modell löschen',
      },
      chat: {
        conversation: 'Chat-Unterhaltung',
        error_create_chat: 'Fehler beim Erstellen des Chats', // Added (translated concept)
        no_chat_selected: 'Kein Chat ausgewählt', // Corrected value
        loading_chats: 'Chats werden geladen...',
        loading_history: 'Chatverlauf wird geladen...',
        list_error: 'Fehler beim Laden der Chats',
        list_chats_404: 'Keine Chats verfügbar. Starten Sie einen neuen Chat!',
        error_history: 'Fehler beim Laden des Chatverlaufs',
        role_user: 'Sie',
        role_assistant: 'Assistent',
        input_placeholder: 'Nachricht eingeben...',
        send_button: 'Senden',
        sending_button: 'Wird gesendet...',
        timestamp: 'Gesendet: {{datetime}}',
        create_chat: 'Chat erstellen',
        select_model: 'Modell auswählen',
        start_new_chat: 'Neuen Chat starten',
        loading_error: 'Fehler beim Laden der Modelle.',
        interface_title: 'Chat-Oberfläche',
        personal_chat_list_title: 'Ihre Chats',
      },
      users: {
        manage_title: 'Benutzer verwalten',
        create_instruction: 'Neuen Benutzer erstellen',
        list_title: 'Vorhandene Benutzer',
        list_loading: 'Benutzer werden geladen...',
        list_error: 'Fehler beim Laden der Benutzer',
        list_404: 'Keine Benutzer gefunden',
        friendlyName: 'Name',
        email: 'E-Mail',
        subject: 'Betreff',
        password: 'Passwort',
        form_error: 'Beim Speichern der Benutzerdaten ist ein Fehler aufgetreten',
        saving: 'Wird gespeichert...',
        save: 'Speichern',
        cancel: 'Abbrechen',
      },
      login: {
        title: 'Login',
        user_name: 'Benutzername',
        user_password: 'Passwort',
        loading: 'lade',
        submit: 'Login',
        switch_to_register: 'Registrieren',
      },
      register: {
        title: 'Registrierung',
        error: 'Registrierungsfehler: {{error}}',
        loading: 'Registriere...',
        submit: 'Registrieren',
        switch_to_login: 'Zurück zum Login',
        email: 'E-Mail',
        subject: 'Betreff',
        password: 'Passwort',
        confirm_password: 'Passwort bestätigen',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
      format: (value, format) => {
        if (format === 'year') return new Date().getFullYear();
        return value;
      },
    },
    resources,
  });

export default i18n;
