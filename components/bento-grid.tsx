import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import { ReactNode } from 'react';

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('grid w-full grid-cols-4 gap-4', className)}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  href,
  cta,
}: {
  name: string;
  className: string;
  background?: ReactNode;
  href: string;
  cta: ReactNode;
}) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-4 flex flex-col justify-between overflow-hidden rounded-xl',
      'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      className
    )}>
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 py-10 transition-all duration-300 group-hover:-translate-y-6">
      <h3 className="text-xl font-medium text-black">{name}</h3>
    </div>

    <div
      className={cn(
        'pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
      )}>
      <Button
        variant="default"
        asChild
        size="sm"
        className="pointer-events-auto">
        <a href={href}>
          {cta}
          <MoveRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
