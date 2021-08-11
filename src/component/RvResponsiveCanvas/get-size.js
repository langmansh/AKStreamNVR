

const parseNumber = prop => parseFloat(prop) || 0;

const getSize = (el) => {
    if (el === window || el === document.body) {
        return [window.innerWidth, window.innerHeight];
    }

    let temporary = false;

    if (!el.parentNode && document.body) {
        temporary = true;
        document.body.appendChild(el);
    }

    const rect = el.getBoundingClientRect();
    const styles = getComputedStyle(el);
    const height =
        (rect.height | 0) +
        parseNumber(styles.getPropertyValue('margin-top')) +
        parseNumber(styles.getPropertyValue('margin-bottom'));
    const width =
        (rect.width | 0) +
        parseNumber(styles.getPropertyValue('margin-left')) +
        parseNumber(styles.getPropertyValue('margin-right'));

    if (temporary && document.body) {
        document.body.removeChild(el);
    }

    return [width, height];
};

export default getSize;