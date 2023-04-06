const { Temperament, conn } = require('../../src/db.js');

describe('Temperament model', () => {
    before(() => conn.authenticate()
    .catch((err) => {
        console.error('No se pudo conectar con la base de datos')
    }));
    describe('Validar', () => {
        beforeEach(() => Temperament.sync({ force: true }));
        describe('Nombre', () => {
            it('Debe arrojar un error si el nombre es null', (done) => {
                Temperament.create({})
                .then(() => done(new Error('El temperamento requiere un nombre')))
                .catch(() => done());
            });
            it('Deberia funcionar si hay un temperamento escrito', () => {
                Temperament.create({ name: 'Agresivo' });
              });
            
        })
    })
})