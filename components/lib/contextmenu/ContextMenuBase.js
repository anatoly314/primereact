import { ObjectUtils } from '../utils/Utils';

export const ContextMenuBase = {
    defaultProps: {
        __TYPE: 'ContextMenu',
        id: null,
        model: null,
        style: null,
        className: null,
        global: false,
        autoZIndex: true,
        baseZIndex: 0,
        breakpoint: undefined,
        scrollHeight: '400px',
        appendTo: null,
        transitionOptions: null,
        onShow: null,
        onHide: null,
        submenuIcon: null,
        children: undefined
    },
    getProps: (props) => ObjectUtils.getMergedProps(props, ContextMenuBase.defaultProps),
    getOtherProps: (props) => ObjectUtils.getDiffProps(props, ContextMenuBase.defaultProps)
};
