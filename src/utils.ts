import { getUnixTime } from 'date-fns';

export const createTimestamp = () => getUnixTime(new Date()).toString();

export const getAppUrl = () =>
	process.env.DEPLOY_URL?.replace(/\/+$/, '') ?? 'http://localhost:3000';
