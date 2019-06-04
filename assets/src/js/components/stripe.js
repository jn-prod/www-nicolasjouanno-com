import Stripe from 'Stripe'
var siteUrl = 'https://nicolasjouanno.com'

var stripeClient = () => {
  if ($('#stripe_checkout_button').length >= 1) {
    const stripeKey = document.getElementById('stripe_key').value
    const stripe = Stripe(stripeKey)
    var checkoutButton = $('.stripe_checkout_button')

    checkoutButton.on('click', (e) => {
      var product = e.currentTarget.value
      // When the customer clicks on the button, redirect
      // them to Checkout.
      stripe.redirectToCheckout({
        items: [{ plan: product, quantity: 1 }],

        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: siteUrl + '/paiement/success.html',
        cancelUrl: siteUrl + '/paiement/canceled.html'
      })
        .then((result) => {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            var displayError = document.getElementById('error-message')
            displayError.textContent = result.error.message
          }
        })
    })
  }
}

export default stripeClient()
