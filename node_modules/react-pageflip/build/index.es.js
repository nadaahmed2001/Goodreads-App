import React, { useRef, useState, useImperativeHandle, useCallback, useEffect } from 'react';
import { PageFlip } from 'page-flip';

const HTMLFlipBookForward = React.forwardRef((props, ref) => {
    const htmlElementRef = useRef(null);
    const childRef = useRef([]);
    const pageFlip = useRef();
    const [pages, setPages] = useState([]);
    useImperativeHandle(ref, () => ({
        pageFlip: () => pageFlip.current,
    }));
    const refreshOnPageDelete = useCallback(() => {
        if (pageFlip.current) {
            pageFlip.current.clear();
        }
    }, []);
    const removeHandlers = useCallback(() => {
        const flip = pageFlip.current;
        if (flip) {
            flip.off('flip');
            flip.off('changeOrientation');
            flip.off('changeState');
            flip.off('init');
            flip.off('update');
        }
    }, []);
    useEffect(() => {
        childRef.current = [];
        if (props.children) {
            const childList = React.Children.map(props.children, (child) => {
                return React.cloneElement(child, {
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
    useEffect(() => {
        const setHandlers = () => {
            const flip = pageFlip.current;
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
            if (htmlElementRef.current && !pageFlip.current) {
                pageFlip.current = new PageFlip(htmlElementRef.current, props);
            }
            if (!pageFlip.current.getFlipController()) {
                pageFlip.current.loadFromHTML(childRef.current);
            }
            else {
                pageFlip.current.updateFromHtml(childRef.current);
            }
            setHandlers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages]);
    return (React.createElement("div", { ref: htmlElementRef, className: props.className, style: props.style }, pages));
});
const HTMLFlipBook = React.memo(HTMLFlipBookForward);

export default HTMLFlipBook;
//# sourceMappingURL=index.es.js.map
