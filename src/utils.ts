import { getUnixTime } from 'date-fns';
import format from 'date-fns/format';

export const createTimestamp = () => getUnixTime(new Date()).toString();

export const getAppUrl = () =>
	process.env.DEPLOY_URL?.replace(/\/+$/, '') ?? 'http://localhost:3000';

export const parseDate = (date: Date) => format(date, 'yyyy-MM-dd');
