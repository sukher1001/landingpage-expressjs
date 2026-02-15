const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Security & Performance
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(compression());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Static files
app.use('/client', express.static(path.join(__dirname, '../../public/client')));
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Home - Landing Page',
        page: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About Us - Landing Page',
        page: 'about'
    });
});

app.get('/services', (req, res) => {
    res.render('pages/services', {
        title: 'Our Services - Landing Page',
        page: 'services'
    });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact Us - Landing Page',
        page: 'contact'
    });
});

// API endpoint for contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Contact form submission:', { name, email, message });
    res.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('pages/404', {
        title: '404 - Page Not Found',
        page: '404'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/error', {
        title: 'Error',
        page: 'error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = app;
