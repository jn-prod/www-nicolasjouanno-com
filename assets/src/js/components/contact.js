var contact = () => {
  $('.contact').on('click', (e) => {
    console.log(e.target.innerHTML)
    e.target.innerHTML = '<a href="mailto:pro@nicolasjouanno.com" class="text-light">pro@nicolasjouanno.com</a>'
  })
}

export default contact()
