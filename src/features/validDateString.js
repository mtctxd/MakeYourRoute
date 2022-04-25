function mathWrapper(x, v) {
  return x / v;
}

const validDateString = (time) => {
  const hours = Math.round(mathWrapper(time, 60 * 60) % 60);
  const minutes = Math.round(((mathWrapper(time, 60 * 60) % 60) % 1) * 60);

  return `${hours}h ${minutes}m`;
};

export default validDateString;
