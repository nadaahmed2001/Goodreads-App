import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState, useContext } from 'react';
import LanguageContext from '../src/context/language';

const SplitText = ({
    className = '',
    delay = 20,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = 'easeOutCubic',
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete,
}) => {
    const { language } = useContext(LanguageContext);

    // 🏆 Define Translations
    const translations = {
        en: "A place where book lovers can find, review, and buy books easily. Discover recommendations, keep reading lists, and shop for your next read—all in one place.",
        ar: "مكان يمكن لعشاق الكتب فيه العثور على الكتب و مراجعتها وشرائها بسهولة. اكتشف التوصيات، احتفظ بقوائم القراءة، وتسوق لقراءتك التالية - كل ذلك في مكان واحد.",
    };

    const text = translations[language] || translations.en; // Default to English
    const words = text.split(' ').map(word => word.split(''));
    const letters = words.flat();

    const [inView, setInView] = useState(false);
    const ref = useRef();
    const animatedCount = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing },
        }))
    );

    return (
        <p
            ref={ref}
            className={`split-parent ${className}`}
            style={{ 
                textAlign, 
                overflow: 'hidden', 
                display: 'inline', 
                whiteSpace: 'normal', 
                wordWrap: 'break-word', 
                direction: language === 'ar' ? 'rtl' : 'ltr' // Adjust text direction
            }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.map((letter, letterIndex) => {
                        const index = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                        return (
                            <animated.span
                                key={index}
                                style={{
                                    ...springs[index],
                                    display: 'inline-block',
                                    willChange: 'transform, opacity',
                                }}
                            >
                                {letter}
                            </animated.span>
                        );
                    })}
                    <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                </span>
            ))}
        </p>
    );
};

export default SplitText;
