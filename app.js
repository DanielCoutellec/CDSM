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

// Accueil
app.get("/", (req, res) => {
  res.render("index", {
    title: "CDSM - Votre partenaire numérique",
    currentPath: "/"
  });
});

// Nos solutions
app.get("/solutions", (req, res) => {
  res.render("solutions", {
    title: "Nos solutions - CDSM",
    currentPath: "/solutions"
  });
});

// Qui sommes-nous ?
app.get("/qui-sommes-nous", (req, res) => {
  res.render("qui-sommes-nous", {
    title: "Qui sommes-nous ? - CDSM",
    currentPath: "/qui-sommes-nous"
  });
});

// Références
app.get("/references", (req, res) => {
  res.render("references", {
    title: "Nos références - CDSM",
    currentPath: "/references"
  });
});

// Contact
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact - CDSM",
    currentPath: "/contact",
    success: false,
    error: false
  });
});

// Envoi formulaire contact
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
      from: `"Site CDSM" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Nouveau contact CDSM - ${objet || "Demande"}`,
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
      title: "Contact - CDSM",
      currentPath: "/contact",
      success: true,
      error: false
    });
  } catch (error) {
    console.error("Erreur envoi email :", error);

    res.render("contact", {
      title: "Contact - CDSM",
      currentPath: "/contact",
      success: false,
      error: true
    });
  }
});

// ==========================================
// PAGES LÉGALES
// ==========================================

app.get("/mentions-legales", (req, res) => {
  res.render("mentions-legales", {
    title: "Mentions légales - CDSM",
    currentPath: "/mentions-legales"
  });
});

app.get("/confidentialite", (req, res) => {
  res.render("confidentialite", {
    title: "Politique de confidentialité - CDSM",
    currentPath: "/confidentialite"
  });
});

app.get("/cgu", (req, res) => {
  res.render("cgu", {
    title: "Conditions générales d'utilisation - CDSM",
    currentPath: "/cgu"
  });
});

// ==========================================
// ANCIENNES URLS
// ==========================================

// Ancienne page Produits
app.get("/produits", (req, res) => {
  res.redirect(301, "/solutions");
});

// Ancienne page Revendeurs
app.get("/revendeurs", (req, res) => {
  res.redirect(301, "/solutions");
});

// ==========================================
// SERVEUR LOCAL
// ==========================================

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ CDSM démarré : http://localhost:${PORT}`);
  });
}

// ==========================================
// EXPORT VERCEL
// ==========================================

module.exports = app;