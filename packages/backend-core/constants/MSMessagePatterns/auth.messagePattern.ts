import { MicroServiceNames, Versions } from '../constant';

/*
// Please define the message pattern by the following format:
// 1: microservice name
// 2: specific message action name (CRUD)
// 3: Version (To clearfy different version of the same message)
    Example:
    GET_TRIP_LIST: `${MicroServiceNames.TRIP}.getTripList.${Versions.v1}`
*/
const AuthMessagePattern = {
  REGISTER: `${MicroServiceNames.AUTH}.register.${Versions.v1}`,
  LOGIN: `${MicroServiceNames.AUTH}.login.${Versions.v1}`,
  REFRESH: `${MicroServiceNames.AUTH}.refresh.${Versions.v1}`,
};
export default AuthMessagePattern;
