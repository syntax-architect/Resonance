import React from 'react';
import { X } from 'lucide-react';

const LANGUAGES = [
  { native: 'English', en: 'English' },
  { native: 'Afrikaans', en: 'Afrikaans' },
  { native: 'አማርኛ', en: 'Amharic' },
  { native: 'العربية', en: 'Arabic' },
  { native: 'عربي مصري', en: 'Arabic (Egypt)' },
  { native: 'العَرَبِيَّة مغربي', en: 'Arabic (Morocco)' },
  { native: 'العربية السعودية', en: 'Arabic (Saudi Arabia)' },
  { native: 'Azərbaycanca', en: 'Azerbaijani' },
  { native: 'Български', en: 'Bulgarian' },
  { native: 'भोजपुरी', en: 'Bhojpuri' },
  { native: 'বাংলা', en: 'Bengali' },
  { native: 'Bosanski', en: 'Bosnian' },
  { native: 'Català', en: 'Catalan' },
  { native: 'Čeština', en: 'Czech' },
  { native: 'Dansk', en: 'Danish' },
  { native: 'Deutsch', en: 'German' },
  { native: 'Ελληνικά', en: 'Greek' },
  { native: 'English', en: 'United Kingdom' },
  { native: 'Español de España', en: 'European Spanish' },
  { native: 'Español de Latinoamérica', en: 'Latin American Spanish' },
  { native: 'فارسی', en: 'Persian' },
  { native: 'Suomeksi', en: 'Finnish' },
  { native: 'Filipino', en: 'Filipino' },
  { native: 'Français', en: 'French' },
  { native: 'हिंदी', en: 'Hindi' },
  { native: 'Hrvatski', en: 'Croatian' },
  { native: 'Magyar', en: 'Hungarian' },
  { native: 'Bahasa Indonesia', en: 'Indonesian' },
  { native: 'Íslenska', en: 'Icelandic' },
  { native: 'Italiano', en: 'Italian' },
  { native: '日本語', en: 'Japanese' },
  { native: 'ಕನ್ನಡ', en: 'Kannada' }
];

function LanguageModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Choose a language</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>This updates what you read on open.spotify.com</p>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="language-grid">
            {LANGUAGES.map((lang, idx) => (
              <div key={idx} className={`language-item ${lang.native === 'English' && lang.en === 'English' ? 'active' : ''}`}>
                <h4>{lang.native}</h4>
                <p>{lang.en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageModal;
