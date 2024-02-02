import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { cn } from '@/lib/utils';

export interface BoxProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        className={cn(
          'rounded-lg border border-muted-foreground/30 bg-muted p-6',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Box.displayName = 'Box';

export { Box };
