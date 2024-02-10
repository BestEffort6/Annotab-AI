export type TokenTypes = 'email_verification' | 'workspace_invitation';

export interface VerifyTokenPayload {
  token: string;
  type: TokenTypes;
}
