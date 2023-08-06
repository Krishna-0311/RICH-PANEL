document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('your_publishable_key'); // Replace with your actual Stripe publishable key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const paymentForm = document.getElementById('payment-form');
    const payButton = document.getElementById('pay-button');
    const cardErrors = document.getElementById('card-errors');

    paymentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        payButton.disabled = true;

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            cardErrors.textContent = error.message;
            payButton.disabled = false;
        } else {
            // Send the token to your server for processing
            const response = await fetch('/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token.id })
            });

            const data = await response.json();
            if (data.success) {
                alert('Payment successful');
                // Redirect to success page or another page
            } else {
                alert('Payment failed');
                payButton.disabled = false;
            }
        }
    });
});
