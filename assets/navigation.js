const desktopMedia = window.matchMedia('(min-width: 90.0625rem)');
const header = document.querySelector('.c-layout__header');
const headerNavigation = header?.querySelector('.c-navigation');
const navigation = document.querySelector('.c-layout__navigation');

if (header && headerNavigation && navigation) {
  const navigationAnchor = document.createComment('desktop navigation anchor');
  navigation.before(navigationAnchor);

  let state = {
    desktop: false,
    sticky: false,
  };

  const getNextState = (currentState) => ({
    ...currentState,
    desktop: desktopMedia.matches,
    sticky:
      desktopMedia.matches &&
      window.scrollY >= header.offsetTop + header.offsetHeight,
  });

  const render = (nextState) => {
    if (nextState.desktop && !state.desktop) {
      headerNavigation.append(navigation);
      headerNavigation.classList.add('c-navigation--desktop');
    }

    if (!nextState.desktop && state.desktop) {
      navigationAnchor.after(navigation);
      headerNavigation.classList.remove('c-navigation--desktop');
    }

    navigation.classList.toggle('is-sticky', nextState.sticky);
    state = nextState;
  };

  const syncNavigation = () => render(getNextState(state));

  desktopMedia.addEventListener('change', syncNavigation);
  window.addEventListener('scroll', syncNavigation, { passive: true });
  window.addEventListener('resize', syncNavigation);
  syncNavigation();
}
