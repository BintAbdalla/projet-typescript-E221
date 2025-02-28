import * as readlineSync from 'readline-sync';

// Définition des interfaces
interface Medecin {
    id: number;
    prenom: string;
    nom: string;
    specialite: string;
}

interface Patient {
    id: number;
    prenom: string;
    nom: string;
    adresse: string;
    telephone: string;
}

interface RendezVous {
    id: number;
    medecinId: number;
    patientId: number;
    date: string;
}

// Bases de données simulées
const medecins: Medecin[] = [];
const patients: Patient[] = [];
const rendezVous: RendezVous[] = [];

// Fonctions d'ajout
function ajouterMedecin() {
    const id = medecins.length > 0 ? Math.max(...medecins.map(m => m.id)) + 1 : 1;  
    const prenom = readlineSync.question('Prenom du medecin: ');
    const nom = readlineSync.question('Nom du medecin: ');
    const specialite = readlineSync.question('Specialite: ');
    medecins.push({ id, prenom, nom, specialite });
    console.log(`Médecin ajouté avec succès ! ID: ${id}`);
}

function ajouterPatient() {
    const id = patients.length + 1;
    const prenom = readlineSync.question('Prenom du patient: ');
    const nom = readlineSync.question('Nom du patient: ');
    const adresse = readlineSync.question('Adresse: ');
    const telephone = readlineSync.question('Téléphone: ');
    patients.push({ id, prenom, nom, adresse, telephone });
    console.log('Patient ajouté avec succès !');
}



function ajouterRendezVous() {
    
    const medecinId = Number(readlineSync.question('Choisir un ID de médecin: '));
    const date = readlineSync.question('Date du rendez-vous (jj/mm/aaaa): ');
   
    const medecinExiste = medecins.some(m => m.id === medecinId);
    
    if (!medecinExiste) {
        console.log('ID de médecin invalide. Veuillez choisir un ID valide.');
        return; 
    }
    
    const patientId = Number(readlineSync.question('Choisir un ID de patient: '));
    
    const patientExiste = patients.some(p => p.id === patientId);
    
    if (!patientExiste) {
        console.log('ID de patient invalide. Veuillez choisir un ID valide.');
        return; 
    }
    
    
    const id = rendezVous.length > 0 ? Math.max(...rendezVous.map(rv => rv.id)) + 1 : 1;
    
    
    rendezVous.push({ id, medecinId, patientId, date });
    
 
    console.log(`RV créé avec succès ! ID: ${id}, Médecin: ${medecinId}, Patient: ${patientId}, Date: ${date}`);
}

// Fonctions d'affichage
function listerMedecins() {
    console.log('Liste des médecins:');
    medecins.forEach(m => console.log(`${m.id}. ${m.prenom} ${m.nom} - ${m.specialite}`));
    if (medecins.length === 0) {
        console.log('Aucun médecin n\'a été ajouté.');
    }
}

function listerPatients() {
    console.log('Liste des patients:');
    patients.forEach(p => console.log(`${p.id}. ${p.prenom} ${p.nom} - ${p.telephone}`));
    if (patients.length === 0) {
        console.log('Aucun patient n\'a été ajouté.');
    }
}

function listerRendezVous() {
    console.log('Liste des rendez-vous:');
    rendezVous.forEach(rv => {
        const medecin = medecins.find(m => m.id === rv.medecinId);
        const patient = patients.find(p => p.id === rv.patientId);
        console.log(`Rendez-vous ${rv.id}: ${medecin?.prenom} ${medecin?.nom} avec ${patient?.prenom} ${patient?.nom} le ${rv.date}`);
    });
    if (rendezVous.length === 0) {
        console.log('Aucun rendez-vous n\'a été ajouté.');
    }
}

function filtreRendezVous(){
    console.log('Liste des rendez-vous pour une date spécifique (format dd/mm/yyyy):');
    const date = readlineSync.question('Date (dd/mm/yyyy): ');
    const rendezVousPendantDate = rendezVous.filter(rv => rv.date === date);
    rendezVousPendantDate.forEach(rv => {
        const medecin = medecins.find(m => m.id === rv.medecinId);
        const patient = patients.find(p => p.id === rv.patientId);
        console.log(`Rendez-vous ${rv.id}: ${medecin?.prenom} ${medecin?.nom} avec ${patient?.prenom} ${patient?.nom} le ${rv.date}`);
    });
    if (rendezVousPendantDate.length === 0) {
        console.log('Aucun rendez-vous n\'est programmé pour cette date.');
    }
}

function listerRendezvousMedecin(){
    console.log('Liste des rendez-vous pour un médecin spécifique:');
    const medecinId = Number(readlineSync.question('ID du médecin: '));
    const rendezVousPourMedecin = rendezVous.filter(rv => rv.medecinId === medecinId);
    rendezVousPourMedecin.forEach(rv => {
        const patient = patients.find(p => p.id === rv.patientId);
        console.log(`Rendez-vous ${rv.id}: ${patient?.prenom} ${patient?.nom} le ${rv.date}`);
    });
    if (rendezVousPourMedecin.length === 0) {
        console.log('Aucun rendez-vous n\'est programmé pour ce médecin.');
    }
}

// Menu principal
function menu() {
    while (true) {
        console.log('\nMenu Principal');
        console.log('1. Ajouter un médecin');
        console.log('2. Ajouter un patient');
        console.log('3. Ajouter un rendez-vous');
        console.log('4. Lister les médecins');
        console.log('5. Lister les patients');
        console.log('6. Lister les rendez-vous');
        console.log('7. Filtrer les rendez-vous');
        console.log('8. Lister les rendez-vous pour un médecin spécifique'); 
        console.log('0. Quitter');
        
        const choix = readlineSync.question('Votre choix: ');
        switch (choix) {
            case '1': ajouterMedecin(); break;
            case '2': ajouterPatient(); break;
            case '3': ajouterRendezVous(); break;
            case '4': listerMedecins(); break;
            case '5': listerPatients(); break;
            case '6': listerRendezVous(); break;
            case '7': filtreRendezVous(); break;  
            case '8': listerRendezvousMedecin(); break;
            case '0': console.log('Au revoir !'); return;
            default: console.log('Choix invalide, réessayez.');
        }
    }
}

menu();