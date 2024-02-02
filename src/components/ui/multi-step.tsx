import { cn } from '@/lib/utils';

interface MultiStepProps extends React.HTMLAttributes<HTMLDivElement> {
  size: number;
  currentStep?: number;
}

export function MultiStep({ size, currentStep = 1, ...props }: MultiStepProps) {
  return (
    <div {...props}>
      <p className="text-xs text-muted-foreground">
        Passo {currentStep} de {size}
      </p>

      <div className={`mt-1 flex gap-2`}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <div
              key={step}
              className={cn('h-1 flex-1 rounded-full bg-secondary', {
                'bg-secondary-foreground': currentStep >= step,
              })}
            />
          );
        })}
      </div>
    </div>
  );
}

MultiStep.displayName = 'MultiStep';
