// AUTO-GENERE depuis config.json — ne pas modifier directement, modifier config.json puis relancer update-config.bat
const SITE_CONFIG = {
  "salon": {
    "nom": "Cathy Coiffure",
    "slogan": "Coiffeuse spécialisée cheveux longs à Épalinges",
    "description": "Tout le savoir-faire d'une coiffeuse spécialisée cheveux longs allié aux derniers progrès techniques, pour vous sublimer avec le sourire.",
    "experience": "45+"
  },
  "contact": {
    "telephone": "021 784 39 29",
    "telephoneIntl": "+41217843929",
    "mobile": "079 703 32 19",
    "mobileIntl": "+41797033219",
    "email": "cathy@cathy-coiffure.com",
    "site": "https://www.cathy-coiffure.com"
  },
  "adresse": {
    "rue": "Route de la Croix-Blanche 44",
    "cp": "1066",
    "ville": "Epalinges",
    "canton": "VD",
    "pays": "Suisse",
    "complete": "Route de la Croix-Blanche 44, 1066 Epalinges (VD)"
  },
  "horaires": {
    "standard": {
      "periode": "Octobre - Mai",
      "jours": {
        "lundi":    { "ouvert": false, "texte": "Fermé" },
        "mardi":    { "ouvert": false, "texte": "Fermé" },
        "mercredi": { "ouvert": false, "texte": "Fermé" },
        "jeudi":    { "ouvert": true,  "texte": "09h30 - 12h00 / 14h00 - 19h00" },
        "vendredi": { "ouvert": true,  "texte": "09h30 - 12h00 / 14h00 - 19h00" },
        "samedi":   { "ouvert": false, "texte": "Fermé" },
        "dimanche": { "ouvert": false, "texte": "Fermé" }
      }
    },
    "ete": {
      "periode": "1er juin - 30 septembre",
      "jours": {
        "lundi":    { "ouvert": false, "texte": "Fermé" },
        "mardi":    { "ouvert": false, "texte": "Fermé" },
        "mercredi": { "ouvert": false, "texte": "Fermé" },
        "jeudi":    { "ouvert": true,  "texte": "09h30 - 12h00 / 14h00 - 19h00" },
        "vendredi": { "ouvert": true,  "texte": "09h30 - 12h00 / 14h00 - 19h00" },
        "samedi":   { "ouvert": false, "texte": "Fermé" },
        "dimanche": { "ouvert": false, "texte": "Fermé" }
      }
    },
    "dernierRdv": {
      "dames": "18h00",
      "messieurs": "18h30"
    }
  },
  "tarifs": {
    "devise": "CHF",
    "prixHeure": "130.00",
    "categories": {
      "dames": {
        "titre": "Dames",
        "prestations": [
          { "nom": "Shampooing + mise en plis",                   "prix": "34.00" },
          { "nom": "Shampooing + mise en plis (cheveux longs)",   "prix": "dès 47.50" },
          { "nom": "Brushing ou touching",                        "prix": "41.00 - 54.00" },
          { "nom": "Séchage sans mise en forme",                  "prix": "35.00" },
          { "nom": "Coupe",                                       "prix": "37.00" },
          { "nom": "Permanente + protection",                     "prix": "66.00 - 81.50" },
          { "nom": "Défrisage",                                   "prix": "dès 78.50" },
          { "nom": "Teinture",                                    "prix": "44.00 - 56.50" },
          { "nom": "Décoloration",                                "prix": "47.50 - 57.00" },
          { "nom": "Coups de soleil avec coulage",                "prix": "dès 94.00" },
          { "nom": "Rinçage",                                     "prix": "36.00" },
          { "nom": "Manucure",                                    "prix": "36.00" }
        ]
      },
      "messieurs": {
        "titre": "Messieurs",
        "prestations": [
          { "nom": "Shampooing + coupe (sans séchage)",  "prix": "57.00" },
          { "nom": "Shampooing + coupe + séchage",       "prix": "42.50" },
          { "nom": "Coupe sèche",                         "prix": "32.00" },
          { "nom": "Shampooing + séchage",                "prix": "32.00" },
          { "nom": "Permanente",                          "prix": "67.00" },
          { "nom": "Défrisage",                           "prix": "dès 51.50" },
          { "nom": "Coloration",                          "prix": "dès 42.50" },
          { "nom": "Rinçage",                             "prix": "31.00" },
          { "nom": "Manucure",                            "prix": "28.00" }
        ]
      },
      "enfants": {
        "titre": "Enfants",
        "prestations": [
          { "nom": "Coupe fillette",                 "prix": "54.00" },
          { "nom": "Coupe jeune fille (dès 13 ans)", "prix": "59.00" },
          { "nom": "Coupe jeune garcon",             "prix": "39.50" }
        ]
      },
      "supplements": {
        "titre": "Suppléments",
        "prestations": [
          { "nom": "Masque",             "prix": "6.50" },
          { "nom": "Crème nutritive",    "prix": "6.50" },
          { "nom": "Fixatif",            "prix": "6.50" },
          { "nom": "Presifon",           "prix": "7.50" },
          { "nom": "Shampooing spécial", "prix": "5.50" }
        ]
      }
    }
  },
  "parking": "Parking gratuit à disposition de la clientèle",
  "palmares": [
    { "annee": "1982", "médaille": "gold", "lieu": "Rome, Italie", "description": "Coppa Latina — Vincitrice assoluta, Médaille d'or (Confédération Mondiale de la Coiffure)" },
    { "annee": "1990", "médaille": "bronze", "lieu": "Championnat Suisse", "description": "3ème prix - Spécialité : Mariage" },
    { "annee": "1992", "médaille": "bronze", "lieu": "Boucles du Léman", "description": "3ème prix - Spécialité : Mariage" }
  ]
};
