import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor() {
        super({
            clientID: "309191578060-tm0p3hog4bsukij6su58nmdg44r3t99s.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth/google/callback",
            scope: ["email", "profile"]
        })
    }

    authorizationParams(options: any): object {
        return {
          prompt: 'consent',
          access_type: 'offline',
        };
      }
    
      async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        cb: VerifyCallback,
      ) {
        return cb(null, { ...profile, accessToken, refreshToken });
      }
}