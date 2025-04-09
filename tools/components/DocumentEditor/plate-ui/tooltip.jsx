import React from 'react';
import { Button } from '@mui/material';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { withCn, withProps } from '@udecode/cn';

const tooltipStyles = {
  base: {
    backgroundColor: '#1E2128', // Dark background matching your toolbar
    color: '#9D74FF', // Violet text color
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '0.8rem',
    fontFamily: "'Satoshi', sans-serif",
    fontWeight: '500',
    boxShadow: '0 4px 6px rgba(157, 116, 255, 0.1)', // Violet-tinted shadow
    border: '1px solid #9D74FF', // Violet border
    zIndex: 50,
    maxWidth: '250px',
    wordWrap: 'break-word',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    lineHeight: '1.4',
    transition: 'all 0.2s ease-in-out',
    backdropFilter: 'blur(4px)',
    opacity: 0.9,
  },
};

export const TooltipProvider = withProps(TooltipPrimitive.Provider, {
  delayDuration: 0,
  disableHoverableContent: true,
  skipDelayDuration: 0,
});

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipPortal = TooltipPrimitive.Portal;

export const TooltipContent = withCn(
  withProps(TooltipPrimitive.Content, {
    sideOffset: 15,
    style: tooltipStyles.base,
  })
);

export function withTooltip(Component) {
  return React.forwardRef((props, ref) => {
    const {
      delayDuration,
      disableHoverableContent,
      skipDelayDuration,
      tooltip,
      tooltipContentProps,
      tooltipProps,
      tooltipTriggerProps,
      ...restProps
    } = props;

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const component = <Component ref={ref} {...restProps} />;

    if (tooltip && mounted) {
      return (
        <TooltipProvider
          delayDuration={delayDuration}
          disableHoverableContent={disableHoverableContent}
          skipDelayDuration={skipDelayDuration}
        >
          <Tooltip {...tooltipProps}>
            <TooltipTrigger asChild {...tooltipTriggerProps}>
              {component}
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent className="z-1000" {...tooltipContentProps}>
                {tooltip}
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return component;
  });
}

export const TooltipButton = withTooltip(Button);
