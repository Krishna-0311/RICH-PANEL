const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51NbNjySEJskGMQSstdj9k8WHA8AvybjD6XqG01gz5gWiefbdQJ4v3InnzwHFGdynxVGjOkvLGplZhmATizYoWr7J00voNahXrV');

app.use(bodyParser.json());

app.post('/process-payment', async (req, res) => {
    const token = req.body.token;

    try {
        const charge = await stripe.charges.create({
            amount: 1000, // Amount in cents
            currency: 'usd',
            source: token,
            description: 'Example Charge'
        });

        // Handle successful charge
        res.json({ message: 'Payment successful', charge });
    } catch (error) {
        // Handle error
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
