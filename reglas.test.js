const { calcularNuevoMarcador } = require('./reglas');

test('Si tengo 10 puntos y anoto una canasta de 2, el resultado debe ser 12', function () {
    const resultado = calcularNuevoMarcador(10, 2);
    expect(resultado).toBe(12);
});

test('Si tengo 10 puntos y anoto un triple (3), el resultado debe ser 13', function () {
    const resultado = calcularNuevoMarcador(10, 3);
    expect(resultado).toBe(13);
});
