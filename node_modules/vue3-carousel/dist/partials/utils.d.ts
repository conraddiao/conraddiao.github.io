/**
 * return a debounced version of the function
 * @param fn
 * @param delay
 */
export declare function debounce(fn: (...args: any[]) => unknown, delay: number): typeof fn;
/**
 * return a throttle version of the function
 * Throttling
 *
 */
export declare function throttle(fn: (...args: any[]) => unknown, limit: number): typeof fn;
export declare function getSlides(vNode: any[] | undefined): any;
