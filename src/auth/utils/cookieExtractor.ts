import { Request } from 'express';

export function accessTokenExtractor(req: Request) {
  return req?.cookies['access_token'];
}

export function refreshTokenExtractor(req: Request) {
  return req?.cookies['refresh_token'];
}
