var contact = () => {
  $('.contact').on('click', (e) => {
    e.target.innerHTML = '<a href="mailto:pro@nicolasjouanno.com" class="text-primary">pro@nicolasjouanno.com</a>'
  })
}

export default contact()
