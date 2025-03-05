// models/account.ts

export interface Account {
    id: string;
    userId: string;
    providerAccountId: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number; 
    tokenType?: string;
    scope?: string;
    idToken?: string;
    sessionState?: string;
  }
  
  export class AccountImpl implements Account {
    id: string;
    userId: string;
    provider: string;
    providerAccountId: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    tokenType?: string;
    scope?: string;
    idToken?: string;
    sessionState?: string;
  
    constructor(
      userId: string,
      provider: string,
      providerAccountId: string,
      accessToken?: string,
      refreshToken?: string,
      expiresAt?: number,
      tokenType?: string,
      scope?: string,
      idToken?: string,
      sessionState?: string,
      id?: string
    ) {
      if(id){
        this.id = id;
      } else {
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      this.userId = userId;
      this.provider = provider;
      this.providerAccountId = providerAccountId;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.expiresAt = expiresAt;
      this.tokenType = tokenType;
      this.scope = scope;
      this.idToken = idToken;
      this.sessionState = sessionState;
    }
  }