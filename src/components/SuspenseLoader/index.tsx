import { Suspense, PropsWithChildren } from "react";
import { SuspenseContainer } from "./styles";

export function SuspenseLoader({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<SuspenseContainer>&ensp;</SuspenseContainer>}>
      {children}
    </Suspense>
  );
}
