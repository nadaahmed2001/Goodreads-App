'use strict';

var React = require('react');
var pageFlip = require('page-flip');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const HTMLFlipBookForward = React__default['default'].forwardRef((props, ref) => {
    const htmlElementRef = React.useRef(null);
    const childRef = React.useRef([]);
    const pageFlip$1 = React.useRef();
    const [pages, setPages] = React.useState([]);
    React.useImperativeHandle(ref, () => ({
        pageFlip: () => pageFlip$1.current,
    }));
    const refreshOnPageDelete = React.useCallback(() => {
        if (pageFlip$1.current) {
            pageFlip$1.current.clear();
        }
    }, []);
    const removeHandlers = React.useCallback(() => {
        const flip = pageFlip$1.current;
        if (flip) {
            flip.off('flip');
            flip.off('changeOrientation');
            flip.off('changeState');
            flip.off('init');
            flip.off('update');
        }
    }, []);
    React.useEffect(() => {
        childRef.current = [];
        if (props.children) {
            const childList = React__default['default'].Children.map(props.children, (child) => {
                return React__default['default'].cloneElement(child, {
                    ref: (dom) => {
                        if (dom) {
                            childRef.current.push(dom);
                        }
                    },
                });
            });
            if (!props.renderOnlyPageLengthChange || pages.length !== childList.length) {
                if (childList.length < pages.length) {
                    refreshOnPageDelete();
                }
                setPages(childList);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children]);
    React.useEffect(() => {
        const setHandlers = () => {
            const flip = pageFlip$1.current;
            if (flip) {
                if (props.onFlip) {
                    flip.on('flip', (e) => props.onFlip(e));
                }
                if (props.onChangeOrientation) {
                    flip.on('changeOrientation', (e) => props.onChangeOrientation(e));
                }
                if (props.onChangeState) {
                    flip.on('changeState', (e) => props.onChangeState(e));
                }
                if (props.onInit) {
                    flip.on('init', (e) => props.onInit(e));
                }
                if (props.onUpdate) {
                    flip.on('update', (e) => props.onUpdate(e));
                }
            }
        };
        if (pages.length > 0 && childRef.current.length > 0) {
            removeHandlers();
            if (htmlElementRef.current && !pageFlip$1.current) {
                pageFlip$1.current = new pageFlip.PageFlip(htmlElementRef.current, props);
            }
            if (!pageFlip$1.current.getFlipController()) {
                pageFlip$1.current.loadFromHTML(childRef.current);
            }
            else {
                pageFlip$1.current.updateFromHtml(childRef.current);
            }
            setHandlers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages]);
    return (React__default['default'].createElement("div", { ref: htmlElementRef, className: props.className, style: props.style }, pages));
});
const HTMLFlipBook = React__default['default'].memo(HTMLFlipBookForward);

module.exports = HTMLFlipBook;
//# sourceMappingURL=index.js.map
