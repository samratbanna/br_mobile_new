import * as React from 'react';
import {TextInput} from 'react-native';
import {cn} from '~/lib/utils';
import {Box} from './box';
import {Icon} from '../navigation/TabBarIcon';
import {TouchableOpacity} from 'react-native';
import {Eye, EyeOff, UserRound} from 'lucide-react-native';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({className, containerClassName, icon, ...props}, ref) => {
  return (
    <Box
      className={cn(
        'flex-row items-center justify-between rounded-lg border-[1px] border-input bg-white px-3 py-1.5',
        containerClassName,
      )}>
      <TextInput
        ref={ref}
        className={cn(
          'native:h-14 native:text-xl native:leading-[1.25] h-10 rounded-md bg-white px-3 text-base text-foreground file:border-0 file:bg-transparent file:font-medium web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className,
        )}
        placeholderTextColor={'#8F8F8F'}
        style={{fontFamily: 'PoppinsMedium'}}
        {...props}
      />
      {icon &&
        (icon === 'drawerUserIcon' ? (
          <UserRound size={20} color="#8f8f8f" />
        ) : (
          <Icon icon={icon} size={20} imgMode="contain" color="placeholder" />
        ))}
    </Box>
  );
});

Input.displayName = 'Input';

const SecureInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({className, placeholderClassName, ...props}, ref) => {
  const [showPassword, setShowPassword] = React.useState(true);
  return (
    <Box className="flex-row items-center justify-between rounded-lg border-[1px] border-input bg-white px-3 py-1.5">
      <TextInput
        ref={ref}
        className={cn(
          'native:h-14 native:text-xl native:leading-[1.25] h-10 rounded-md bg-white px-3 text-base text-foreground file:border-0 file:bg-transparent file:font-medium web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className,
        )}
        placeholderTextColor={'#8F8F8F'}
        secureTextEntry={showPassword}
        style={{fontFamily: 'PoppinsMedium'}}
        {...props}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <EyeOff size={20} color="#8F8F8F" />
        ) : (
          <Eye size={20} color="#8F8F8F" />
        )}
      </TouchableOpacity>
    </Box>
  );
});

export {Input, SecureInput};
