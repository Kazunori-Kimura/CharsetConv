export interface CommandParameters {
    source: string;
    destination: string;
    from: string;
    to: string;
}

export function isCommandParameters(item: unknown): item is CommandParameters {
    if (typeof item === 'object' && item !== null) {
        const { source, destination, from, to } = item as CommandParameters;
        return (
            typeof source === 'string' &&
            typeof destination === 'string' &&
            typeof from === 'string' &&
            typeof to === 'string'
        );
    }
    return false;
}
