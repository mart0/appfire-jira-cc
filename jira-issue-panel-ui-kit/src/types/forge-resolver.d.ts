declare module '@forge/resolver' {
  export default class Resolver {
    constructor();
    define(functionName: string, handler: (req: any) => any): void;
    getDefinitions(): any;
  }
} 