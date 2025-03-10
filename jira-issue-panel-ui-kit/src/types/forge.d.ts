// Type definitions for Forge modules

declare module '@forge/resolver' {
  export interface Request {
    context?: any;
    payload?: any;
  }

  export default class Resolver {
    define(functionKey: string, handler: (req: Request) => Promise<any>): void;
    getDefinitions(): any;
  }
}

declare module '@forge/bridge' {
  export function invoke<T>(functionKey: string, payload?: any): Promise<T>;
}

declare module '@forge/react' {
  import * as React from 'react';
  
  export const Button: React.FC<any>;
  export const Text: React.FC<any>;
  export const Link: React.FC<any>;
  export const DynamicTable: React.FC<any>;
  
  const ForgeReconciler: {
    render: (element: React.ReactElement) => void;
  };
  
  export default ForgeReconciler;
} 