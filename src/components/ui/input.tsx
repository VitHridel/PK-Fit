import { Input as InputPrimitive } from '@base-ui/react/input'
import type * as React from 'react'
import { cn } from '@/lib/utils'

export const fieldControlClass =
    'w-full min-w-0 rounded-[0.625rem] border border-input bg-field px-3.5 text-base text-foreground transition-colors outline-none placeholder:text-placeholder focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_1px_var(--destructive)]'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <InputPrimitive
            type={type}
            data-slot="input"
            className={cn(fieldControlClass, 'h-11', className)}
            {...props}
        />
    )
}

export { Input }
