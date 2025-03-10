declare module '@forge/react' {
  import { ReactNode } from 'react';
  
  export interface TextProps {
    children: ReactNode;
  }
  
  export function Text(props: TextProps): JSX.Element;
  
  const ForgeReconciler: {
    render(element: JSX.Element): void;
  };
  
  export default ForgeReconciler;
} 