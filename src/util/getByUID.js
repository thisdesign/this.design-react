import error from './error';

const getByUID = (options) => {
  const {
    props,
    pageType,
    uid,
    fetchLinks,
    component,
  } = options;

  if (props.prismicCtx) {
    return props.prismicCtx.api.getByUID(pageType, uid, { fetchLinks }).then((doc) => {
      if (doc) {
        component.setState({ doc });
      } else {
        component.setState({ notFound: !doc });
      }
    });
  }
  error('props.prismicCtx not found.');
  return null;
};

export default getByUID;
