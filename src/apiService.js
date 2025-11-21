// src/apiService.js

// VAŠA UNIKÁTNA GOOGLE APPS SCRIPT URL
const GOOGLE_SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwZ4Mf-rgVSqlTF09QXvpo6cOq75xwdulYizKeAuRcKtX2zHiGp7clvKte2bjrol8Ejiw/exec'; 

/**
 * Odešle email a data kvízu přímo do Tabulek Google.
 */
export const saveEmailToNewsletter = (email, gdprConsent, sourceId) => {
    
    // Data pro zápis do Tabulky Google (musí odpovídat hlavičkám v Tabulce: email, gdpr_consent, source)
    const dataToSend = {
        email: email,
        // Dátový typ je vždy string 'ANO - Odeslano', pretože sa kód kvízu nespustí, ak nie je začiarknuté.
        gdpr_consent: gdprConsent ? 'ANO - Odeslano' : 'NE', 
        source: sourceId 
    };

    return fetch(GOOGLE_SHEET_ENDPOINT, {
        method: 'POST',
        // Dáta posielame ako JSON, ako očakáva Google Apps Script
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) {
            console.error("Chyba pri odosielaní emailu do Tabuliek Google:", response.statusText);
        }
        return response.ok;
    })
    .catch(error => {
        console.error("Sieťová chyba pri odosielaní emailu:", error);
        return false;
    });
};