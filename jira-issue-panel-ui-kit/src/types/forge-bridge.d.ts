declare module '@forge/bridge' {
  export function invoke<T>(functionKey: string, payload?: any): Promise<T>;
} 