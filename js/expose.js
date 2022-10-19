export { expose };

expose({ expose });

function expose(...objects) {
    objects.forEach(obj =>
        Object.entries(obj).forEach(([key, value]) =>
            globalThis[key] = expose[key] = value));
    console.log(Object.keys(expose));
}