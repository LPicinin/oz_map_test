export const RegionService = {
  pontoProximo(
    ponto: [number, number],
    poligono: Array<[number, number]>,
    distanciaMaxima: number
  ) {
    let flag = false;
    poligono.forEach((item) => {
      if (
        calcularDistancia(ponto[0], ponto[1], item[0], item[1]) <=
        distanciaMaxima
      )
        flag = true;
    });

    return flag;
  },
};

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const dx = lat2 - lat1;
  const dy = lon2 - lon1;
  return Math.sqrt(dx * dx + dy * dy);
}
