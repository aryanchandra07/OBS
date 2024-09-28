const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5500; // You can use any available port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your HTML file is in a 'public' directory

app.post('/process_loan', (req, res) => {
    const loanAmount = req.body.loan_amount;
    // Handle loan form submission logic
    res.redirect('/');
});

app.post('/process_fixed_deposit', (req, res) => {
    const depositAmount = req.body.deposit_amount;
    // Handle fixed deposit form submission logic
    res.redirect('/');
});

app.post('/process_currency_exchange', (req, res) => {
    const exchangeAmount = req.body.amount;
    const fromCurrency = req.body.from_currency;
    const toCurrency = req.body.to_currency;
    // Handle currency exchange form submission logic
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
