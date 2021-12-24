import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

const CheckoutForm = ({ order }) => {
    const { price, name, email, _id } = order;
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetch('https://publication-management-client.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price: parseFloat(price) })
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }
        setProcessing(true);

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
  
        if (error) {
            setError(error.message);
        } else {
            setError('');
            setProcessing(false);
            console.log('[PaymentMethod]', paymentMethod);
        }

        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
            setProcessing(false);
        }
        else {
            setError('');
            setSuccess('Your payment processed successfully.')
            console.log(paymentIntent);
            setProcessing(false);
            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            const url = `https://publication-management-client.herokuapp.com/pay-order/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => console.log(data));
        }
    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                { processing ? <Spinner className="text-center" animation="border" variant="danger" /> 
                : <button type="submit" disabled={!stripe || success}>
                    Pay ${price}
                </button>}
            </form>
            {
                error && <p className='text-red bg-warning mt-2'>{error}</p>
            }
            {
                success && <p className='text-white bg-success mt-2'>{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;