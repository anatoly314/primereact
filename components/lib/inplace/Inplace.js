import * as React from 'react';
import { localeOption } from '../api/Api';
import { Button } from '../button/Button';
import { classNames, IconUtils, ObjectUtils } from '../utils/Utils';
import { InplaceBase, InplaceContentBase, InplaceDisplayBase } from './InplaceBase';
import { TimesIcon } from '../icons/times';

export const InplaceDisplay = (props) => props.children;
export const InplaceContent = (props) => props.children;

export const Inplace = React.forwardRef((inProps, ref) => {
    const props = InplaceBase.getProps(inProps);

    const [activeState, setActiveState] = React.useState(props.active);
    const elementRef = React.useRef(null);
    const active = props.onToggle ? props.active : activeState;

    const open = (event) => {
        if (props.disabled) {
            return;
        }

        props.onOpen && props.onOpen(event);

        if (props.onToggle) {
            props.onToggle({
                originalEvent: event,
                value: true
            });
        } else {
            setActiveState(true);
        }
    };

    const close = (event) => {
        props.onClose && props.onClose(event);

        if (props.onToggle) {
            props.onToggle({
                originalEvent: event,
                value: false
            });
        } else {
            setActiveState(false);
        }
    };

    const onDisplayKeyDown = (event) => {
        if (event.key === 'Enter') {
            open(event);
            event.preventDefault();
        }
    };

    const createDisplay = (content) => {
        const otherProps = InplaceDisplayBase.getOtherProps(content);
        const className = classNames('p-inplace-display', {
            'p-disabled': props.disabled
        });

        return (
            <div className={className} {...otherProps} onClick={open} onKeyDown={onDisplayKeyDown} tabIndex={props.tabIndex} aria-label={props.ariaLabel}>
                {content}
            </div>
        );
    };

    const createCloseButton = () => {
        const icon = props.closeIcon || <TimesIcon />;
        const closeIcon = IconUtils.getJSXIcon(icon, undefined, { props });
        const ariaLabel = localeOption('close');

        if (props.closable) {
            return <Button type="button" className="p-inplace-content-close" icon={closeIcon} onClick={close} aria-label={ariaLabel}></Button>;
        }

        return null;
    };

    const createContent = (content) => {
        const otherProps = InplaceContentBase.getOtherProps(content);
        const closeButton = createCloseButton();

        return (
            <div className="p-inplace-content" {...otherProps}>
                {content}
                {closeButton}
            </div>
        );
    };

    const createChildren = () => {
        const validChildTypes = ['InplaceContent', 'InplaceDisplay'];

        return React.Children.map(props.children, (child) => {
            if (active && ObjectUtils.isValidChild(child, 'InplaceContent', validChildTypes)) {
                return createContent(child);
            } else if (!active && ObjectUtils.isValidChild(child, 'InplaceDisplay', validChildTypes)) {
                return createDisplay(child);
            }
        });
    };

    React.useImperativeHandle(ref, () => ({
        props,
        getElement: () => elementRef.current
    }));

    const otherProps = InplaceBase.getOtherProps(props);
    const children = createChildren();
    const className = classNames(
        'p-inplace p-component',
        {
            'p-inplace-closable': props.closable
        },
        props.className
    );

    return (
        <div ref={elementRef} className={className} {...otherProps}>
            {children}
        </div>
    );
});

InplaceDisplay.displayName = 'InplaceDisplay';

InplaceContent.displayName = 'InplaceContent';

Inplace.displayName = 'Inplace';
