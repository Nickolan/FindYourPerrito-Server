import { validate } from './components/Form/validators'

describe('Test Form', () => {
    it('El nombre no puede estar vacio', () => {
        expect(
            validate({
                name: "",
                image: "https://i.redd.it/iwujsd0cffga1.jpg",
                temperament: ["Active"],
                heightMin: '8',
                heightMax: "13",
                weightMin: '8',
                weightMax: '13',
                life_spanMin: '8',
                life_spanMax: '13',
            })
        ).toEqual({
            name: 'Los perros requieren un nombre',
        });
    });

    it('Debe tener minimo 6 años', () => {
        expect(
            validate({
                name: "Perrito",
                image: "https://i.redd.it/iwujsd0cffga1.jpg",
                temperament: ["Active"],
                heightMin: '8',
                heightMax: "13",
                weightMin: '8',
                weightMax: '13',
                life_spanMin: '5',
                life_spanMax: '13',
            })
        ).toEqual({
            life_span: 'Que tan cruel se puede ser para ponerle tan poco tiempo de vida (minimo 6)'
        });
    });

    it('Dog completado correctaments', () => {
        expect(
            validate({
                name: "Perrito",
                image: "https://i.redd.it/iwujsd0cffga1.jpg",
                temperament: ["Active"],
                heightMin: '8',
                heightMax: "13",
                weightMin: '8',
                weightMax: '13',
                life_spanMin: '7',
                life_spanMax: '13',
            })
        ).toEqual({});
    });
})