const isInView = (rect) => {
  const isBelowVpTop = rect.bottom <= 0;
  const isAboveVpBottom = rect.top - window.innerHeight <= 0;
  return isAboveVpBottom !== isBelowVpTop;
};

export default isInView;
