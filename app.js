const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const nodemailer = require("nodemailer");

require("dotenv").config({ path: ".env.local" });

const app = express();


// ==========================================
// FICHIERS STATIQUES
// ==========================================

app.use(express.static(path.join(__dirname, "public")));


// ==========================================
// EJS + LAYOUT
// ==========================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");


// ==========================================
// FORMULAIRES
// ==========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ==========================================
// ROUTES CDSM
// ==========================================


// ------------------------------------------
// ACCUEIL
// ------------------------------------------

app.get("/", (req, res) => {

  res.render("index", {

    title:
  "CDSM - Conseil et transformation numérique des entreprises",

metaDescription:
  "CDSM accompagne les entreprises dans leur transformation numérique : conseil, sites web, applications métier, intelligence artificielle, CRM et déploiement de solutions.",

canonical:
  "https://cdsm.io/qui-sommes-nous",

    ogImage:
      "https://cdsm.io/images/hero/hero-1.jpg",

    currentPath: "/"

  });

});


// ------------------------------------------
// NOS SOLUTIONS
// ------------------------------------------

app.get("/solutions", (req, res) => {

  res.render("solutions", {

    title:
      "Solutions digitales, IA, sites web et CRM - CDSM",

    metaDescription:
      "Découvrez les solutions CDSM : création de sites web et applications métier, intelligence artificielle, CRM et accompagnement du développement commercial.",

    canonical:
      "https://cdsm.io/solutions",

    ogImage:
      "https://cdsm.io/images/pages/solutions.jpg",

    currentPath: "/solutions"

  });

});


// ------------------------------------------
// QUI SOMMES-NOUS ?
// ------------------------------------------

app.get("/qui-sommes-nous", (req, res) => {

  res.render("qui-sommes-nous", {

    title:
      "CDSM - Conseil et accompagnement en transformation numérique",

    metaDescription:
      "Découvrez CDSM, partenaire des entreprises pour leurs projets numériques : analyse des besoins, conseil, développement, déploiement et accompagnement.",

    canonical:
      "https://cdsm.io/qui-sommes-nous",

    ogImage:
      "https://cdsm.io/images/pages/qui-sommes-nous.jpg",

    currentPath: "/qui-sommes-nous"

  });

});


// ------------------------------------------
// RÉFÉRENCES
// ------------------------------------------

app.get("/references", (req, res) => {

  res.render("references", {

    title:
      "Références clients et réalisations digitales - CDSM",

    metaDescription:
      "Découvrez les références CDSM : entreprises, collectivités et associations accompagnées dans leurs projets web, numériques et de transformation digitale.",

    canonical:
      "https://cdsm.io/references",

    ogImage:
      "https://cdsm.io/images/pages/references.jpg",

    currentPath: "/references"

  });

});


// ------------------------------------------
// CONTACT
// ------------------------------------------

app.get("/contact", (req, res) => {

  res.render("contact", {

    title:
      "Contact CDSM - Parlons de votre projet numérique",

    metaDescription:
      "Contactez CDSM pour échanger sur votre projet de site web, application métier, intelligence artificielle, CRM ou transformation numérique.",

    canonical:
      "https://cdsm.io/contact",

    ogImage:
      "https://cdsm.io/images/pages/contact.jpg",

    currentPath: "/contact",

    success: false,
    error: false

  });

});


// ==========================================
// ENVOI FORMULAIRE CONTACT
// ==========================================

app.post("/contact", async (req, res) => {

  try {

    const {
      prenom,
      nom,
      societe,
      email,
      telephone,
      objet,
      message
    } = req.body;


    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }

    });


    await transporter.sendMail({

      from:
        `"Site CDSM" <${process.env.GMAIL_USER}>`,

      to:
        process.env.CONTACT_TO,

      replyTo:
        email,

      subject:
        `Nouveau contact CDSM - ${objet || "Demande"}`,

      text: `
Prénom : ${prenom}
Nom : ${nom}
Société : ${societe || "-"}
Email : ${email}
Téléphone : ${telephone || "-"}
Objet : ${objet || "-"}

Message :
${message}
      `

    });


    res.render("contact", {

      title:
        "Contact CDSM - Parlons de votre projet numérique",

      metaDescription:
        "Contactez CDSM pour échanger sur votre projet de site web, application métier, intelligence artificielle, CRM ou transformation numérique.",

      canonical:
        "https://cdsm.io/contact",

      ogImage:
        "https://cdsm.io/images/pages/contact.jpg",

      currentPath: "/contact",

      success: true,
      error: false

    });


  } catch (error) {

    console.error(
      "Erreur envoi email :",
      error
    );


    res.render("contact", {

      title:
        "Contact CDSM - Parlons de votre projet numérique",

      metaDescription:
        "Contactez CDSM pour échanger sur votre projet de site web, application métier, intelligence artificielle, CRM ou transformation numérique.",

      canonical:
        "https://cdsm.io/contact",

      ogImage:
        "https://cdsm.io/images/pages/contact.jpg",

      currentPath: "/contact",

      success: false,
      error: true

    });

  }

});


// ==========================================
// PAGES LÉGALES
// ==========================================


// ------------------------------------------
// MENTIONS LÉGALES
// ------------------------------------------

app.get("/mentions-legales", (req, res) => {

  res.render("mentions-legales", {

    title:
      "Mentions légales - CDSM",

    metaDescription:
      "Consultez les mentions légales du site CDSM.",

    canonical:
      "https://cdsm.io/mentions-legales",

    currentPath:
      "/mentions-legales"

  });

});


// ------------------------------------------
// CONFIDENTIALITÉ
// ------------------------------------------

app.get("/confidentialite", (req, res) => {

  res.render("confidentialite", {

    title:
      "Politique de confidentialité - CDSM",

    metaDescription:
      "Consultez la politique de confidentialité et de protection des données personnelles du site CDSM.",

    canonical:
      "https://cdsm.io/confidentialite",

    currentPath:
      "/confidentialite"

  });

});


// ------------------------------------------
// CGU
// ------------------------------------------

app.get("/cgu", (req, res) => {

  res.render("cgu", {

    title:
      "Conditions générales d'utilisation - CDSM",

    metaDescription:
      "Consultez les conditions générales d'utilisation du site CDSM.",

    canonical:
      "https://cdsm.io/cgu",

    currentPath:
      "/cgu"

  });

});


// ==========================================
// ANCIENNES URLS
// ==========================================


// Ancienne page Produits

app.get("/produits", (req, res) => {

  res.redirect(
    301,
    "/solutions"
  );

});


// Ancienne page Revendeurs

app.get("/revendeurs", (req, res) => {

  res.redirect(
    301,
    "/solutions"
  );

});


// ==========================================
// SERVEUR LOCAL
// ==========================================

const PORT =
  process.env.PORT || 3000;


if (require.main === module) {

  app.listen(PORT, () => {

    console.log(
      `✅ CDSM démarré : http://localhost:${PORT}`
    );

  });

}


// ==========================================
// EXPORT VERCEL
// ==========================================

module.exports = app;