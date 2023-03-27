import Stripe from 'Stripe';
var siteUrl = 'https://nicolasjouanno.com';

var itemFormat = product => {
  var item = {};
  if (product !== '' && product !== undefined && product !== null) {
    item.format = product.split('_')[0];
    item.ref = product;
  }

  if (item.format === 'sku') {
    item.data = { sku: item.ref, quantity: 1 };
  } else if (item.format === 'plan') {
    item.data = { plan: item.ref, quantity: 1 };
  }
  return item;
};

var stripeClient = () => {
  var checkoutButton = document.querySelectorAll('button.stripe_checkout');

  if (checkoutButton.length >= 1) {
    const stripeKey = document.getElementById('stripe_key').value;
    const stripe = Stripe(stripeKey);

    checkoutButton.forEach((button, i) => {
      checkoutButton[i].addEventListener('click', event => {
        var product = event.target.value;
        var items = [];
        var item = itemFormat(product);

        items.push(item.data);

        // When the customer clicks on the button, redirect
        // them to Checkout.
        stripe
          .redirectToCheckout({
            items: items,

            // Do not rely on the redirect to the successUrl for fulfilling
            // purchases, customers may not always reach the success_url after
            // a successful payment.
            // Instead use one of the strategies described in
            // https://stripe.com/docs/payments/checkout/fulfillment
            successUrl: siteUrl + '/paiement/success.html',
            cancelUrl: siteUrl + '/paiement/canceled.html',
          })
          .then(result => {
            if (result.error) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer.
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          });
      });
    });
  }
};

export default stripeClient();
