import dayjs from 'dayjs';

const getTripInfo = (pointsModel) => {
  const pointsSequence = pointsModel.points.slice(0);
  let tripCost = 0;
  pointsSequence.sort((a, b) => dayjs(a.dateFrom).isAfter(b.dateFrom) ? 1 : -1).forEach((point) => {
    pointsModel.offers.forEach((offersByType) => {
      if (offersByType.type === point.type) {
        offersByType.offers.forEach((offerByType) => {
          if (point.offers.includes(offerByType.id)) {
            tripCost += Number(offerByType.price);
          }
        });
      }
    });
    tripCost += Math.abs(Number(point.basePrice));
  });
  return { pointsSequence, tripCost };
};

export { getTripInfo };
