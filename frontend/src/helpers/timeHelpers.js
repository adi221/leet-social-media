import { formatDistanceStrict } from 'date-fns';

export const formatDateDistance = endDate => {
  const format = formatDistanceStrict(new Date(), new Date(endDate));
  const duration = format.split(' ');
  duration[1] = duration[1].substring(0, 1);
  if (duration[1] === 's') {
    return 'Just now';
  }
  return duration.join('');
};
