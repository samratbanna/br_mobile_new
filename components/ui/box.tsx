import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

const Box = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className,  ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'web:flex w-auto native:flex',        
        className
      )}              
      {...props}
    />
  );
});

Box.displayName = 'Box';

export { Box };



const Flex = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className,  ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'web:flex w-auto bg-background native:flex flex-row',        
        className
      )}              
      {...props}
    />
  );
});

Flex.displayName = 'Flex';

export { Flex };


const VStack = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className,  ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'web:flex w-auto native:flex  items-center',        
        className
      )}              
      {...props}
    />
  );
});

VStack.displayName = 'VStack';

export { VStack };

const HStack = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className,  ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'web:flex w-auto bg-background native:flex flex-row  items-center',        
        className
      )}              
      {...props}
    />
  );
});

HStack.displayName = 'HStack';

export { HStack };



