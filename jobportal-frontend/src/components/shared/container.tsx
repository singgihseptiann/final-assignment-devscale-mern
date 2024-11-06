import React from 'react';

export default function Container({ children }: React.PropsWithChildren) {
  return <section className="container mx-auto px-4">{children}</section>;
}
