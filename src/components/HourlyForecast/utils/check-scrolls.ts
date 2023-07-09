export function checkLeftScroll(element: HTMLDivElement, offset: number): boolean {
    return element.scrollLeft + offset > 0
}

export function checkRightScroll(element: HTMLDivElement, offset: number): boolean {
    return element.scrollLeft + element.clientWidth + offset < element.scrollWidth
}