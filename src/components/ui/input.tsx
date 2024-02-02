import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface InputWithPrefixProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

const InputWithPrefix = React.forwardRef<HTMLInputElement, InputWithPrefixProps>(
  ({ className, prefix, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!, []);
    return (
      <div
        className={cn(
          'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2',
          className,
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {!!prefix && (
          <span className="pointer-events-none select-none text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          className={cn(
            'w-full bg-inherit outline-none ring-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
          )}
          ref={inputRef}
          {...props}
        />
      </div>
    );
  },
);
InputWithPrefix.displayName = 'InputWithPrefix';

export { Input, InputWithPrefix };
