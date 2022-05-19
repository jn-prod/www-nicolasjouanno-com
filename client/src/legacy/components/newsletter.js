var newsletter = () => {
  $('#hsForm_901f7a67-a52d-4e43-9fe3-7f30b58e1a1c').on('submit', e => {
    if ($('input[name=email]').val() === '') {
      $('input[name=email]').addClass('border-danger');
      e.preventDefault();
    } else {
      $('#form-newsletter-element').removeClass('d-block').addClass('d-none');
      $('#form-success-helper').removeClass('d-none').addClass('d-block');
    }
  });
};

export default newsletter();
