export const RegionService = {
  pontoDentroDoPoligono(
    ponto: [number, number],
    poligono: Array<[number, number]>
  ) {
    let x = ponto[0],
      y = ponto[1];
    let dentro = false;
    for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
      let xi = poligono[i][0],
        yi = poligono[i][1];
      let xj = poligono[j][0],
        yj = poligono[j][1];

      let intersecta =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersecta) dentro = !dentro;
    }
    return dentro;
  },
};
